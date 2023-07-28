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
  TemplateRef,
  ViewChild
} from '@angular/core';

import { Any, AnyDto, WpxModel, WpxStoreService } from '@weplanx/ng';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzTableComponent } from 'ng-zorro-antd/table';

import { Column, Preferences, Scroll, WpxColumn } from './types';

@Component({
  selector: 'wpx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxTableComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NzCardComponent, { read: ElementRef, static: true }) card!: ElementRef;
  @ViewChild(NzTableComponent, { read: ElementRef, static: true }) basicTable!: ElementRef;
  @ViewChild('settingsTitleRef') settingsTitleRef!: TemplateRef<Any>;
  @ViewChild('settingsExtraRef') settingsExtraRef!: TemplateRef<Any>;
  @ViewChild('settingsContentRef') settingsContentRef!: TemplateRef<Any>;

  @Input({ required: true }) wpxModel!: WpxModel<T>;
  @Input({ required: true }) wpxColumns!: WpxColumn<T>[];
  @Input({ required: true }) wpxTitle!: TemplateRef<void>;
  @Input({ required: true }) wpxExtra!: TemplateRef<void>;
  @Input({ required: true }) wpxItemSize!: number;

  @Input() wpxX?: string;
  @Input() wpxOffset = 0;
  @Input() wpxActions?: NzDropdownMenuComponent;
  @Output() wpxChange = new EventEmitter<void>();

  columns: Column<T>[] = [];
  settingsRef?: NzDrawerRef;
  resizable = false;

  actived?: AnyDto<T>;
  activedColumn?: WpxColumn<T>;

  scroll = signal<Scroll>({ y: '0px' });
  private resizeObserver!: ResizeObserver;

  constructor(
    private store: WpxStoreService,
    private contextMenu: NzContextMenuService,
    private drawer: NzDrawerService,
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
              width: x?.width,
              display: x?.display,
              sort: x?.sort
            };
          })
          .sort((a, b) => (a.sort as number) - (b.sort as number))
      ];
    });
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        this.scroll.set({
          x: this.wpxX ?? this.basicTable.nativeElement.offsetWidth + 'px',
          y: height - this.wpxItemSize - 180 + 'px'
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.card.nativeElement);
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

  setContext(data: Any): { $implicit: AnyDto<T> } {
    return { $implicit: data };
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
    if (this.settingsRef) {
      return;
    }
    this.settingsRef = this.drawer.create({
      nzTitle: this.settingsTitleRef,
      nzExtra: this.settingsExtraRef,
      nzContent: this.settingsContentRef,
      nzHeight: 200,
      nzMask: false,
      nzMaskClosable: false,
      nzPlacement: 'bottom',
      nzClosable: false
    });
  }

  closeSettings(): void {
    this.settingsRef?.close();
    this.settingsRef = undefined;
    this.resizable = false;
    this.cdr.detectChanges();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.updatePreferences();
  }

  resizableChange(): void {
    this.cdr.detectChanges();
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
