import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  ViewChild
} from '@angular/core';

import { AnyDto, WpxModel, WpxStoreService } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzTableComponent } from 'ng-zorro-antd/table';

import { Column, Preferences, WpxColumn } from './types';

@Component({
  selector: 'wpx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxTableComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('block', { read: ElementRef, static: true }) block!: ElementRef;
  @ViewChild('box', { static: true }) box!: ElementRef;
  @ViewChild('basicTable', { static: true }) basicTable!: NzTableComponent<unknown>;

  @Input({ required: true }) wpxModel!: WpxModel<T>;
  @Input({ required: true }) wpxColumns!: WpxColumn<T>[];
  @Input({ required: true }) wpxItemSize!: number;
  @Input() wpxOffset = 0;
  @Input() wpxActions?: NzDropdownMenuComponent;
  @Output() wpxChange = new EventEmitter<void>();

  columns: Column<T>[] = [];
  settings = false;
  resizable = false;

  actived?: AnyDto<T>;
  activedColumn?: WpxColumn<T>;

  y = signal<number>(0);
  private resizeObserver!: ResizeObserver;

  constructor(
    private store: WpxStoreService,
    private contextMenu: NzContextMenuService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store.get<Map<string, Preferences<T>>>(`${this.wpxModel.key}:table`).subscribe(data => {
      if (!data) {
        this.initColumns();
        return;
      }
      this.columns = [
        ...this.wpxColumns
          .map<Column<T>>(v => {
            const x = data.get(v.key as string);
            return {
              ...v,
              width: x!.width,
              display: x!.display,
              sort: x!.sort
            };
          })
          .sort((a, b) => a.sort! - b.sort!)
      ];
    });

    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.calculate(entry.contentRect.height);
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.block.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  private initColumns(): void {
    this.columns = [
      ...this.wpxColumns.map<Column<T>>(v => ({
        ...v,
        display: true
      }))
    ];
  }

  private calculate(height: number): void {
    this.y.set(height - this.box.nativeElement.offsetHeight - this.wpxItemSize - 112);
  }

  clearSelections(): void {
    this.wpxModel.checked = false;
    this.wpxModel.indeterminate = false;
    this.wpxModel.selection.clear();
    this.cdr.detectChanges();
  }

  openActions($event: MouseEvent, data: AnyDto<T>): void {
    if (this.wpxActions) {
      this.actived = data;
      this.contextMenu.create($event, this.wpxActions);
    }
  }

  openManager($event: MouseEvent, menu: NzDropdownMenuComponent, data: Column<T>): void {
    this.activedColumn = data;
    this.contextMenu.create($event, menu);
  }

  displayAll(): void {
    this.columns.forEach(v => (v.display = true));
    this.updatePreferences();
  }

  hide(column: Column<T>): void {
    column.display = false;
    this.updatePreferences();
  }

  openSettings(): void {
    this.settings = true;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.updatePreferences();
  }

  closeSettings(): void {
    this.settings = false;
    this.resizable = false;
  }

  resize({ width }: NzResizeEvent, column: Column<T>): void {
    column.width = `${width}px`;
  }

  resizeEnd(): void {
    this.cdr.detectChanges();
    this.updatePreferences();
  }

  updatePreferences(): void {
    this.store
      .set<Map<string, Preferences<T>>>(
        `${this.wpxModel.key}:table`,
        new Map([
          ...this.columns.map<[string, Preferences<T>]>((value, index) => [
            value.key as string,
            { display: value.display, width: value.width, sort: index }
          ])
        ])
      )
      .subscribe(() => {
        console.debug('updatePreferences:ok');
      });
  }

  initPreferences(): void {
    this.store.remove(`${this.wpxModel.key}:table`).subscribe(() => {
      this.initColumns();
      this.cdr.detectChanges();
      console.debug('initPreferences:ok');
    });
  }
}
