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

import { AnyDto, WpxModel } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzTableComponent } from 'ng-zorro-antd/table';

import { WpxColumn, WpxTableColumn } from './types';

@Component({
  selector: 'wpx-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxTableComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('block', { read: ElementRef, static: true }) block!: ElementRef;
  @ViewChild('box', { static: true }) box!: ElementRef;
  @ViewChild('basicTable', { static: true }) basicTable!: NzTableComponent<unknown>;

  @Input({ required: true }) wpxColumns!: WpxColumn<T>[];
  @Input({ required: true }) wpxModel!: WpxModel<T>;
  @Input({ required: true }) wpxItemSize!: number;
  @Input() wpxOffset = 0;
  @Input() wpxActions?: NzDropdownMenuComponent;
  @Output() wpxChange = new EventEmitter<void>();

  columns: WpxTableColumn<T>[] = [];
  settings = false;
  resizable = false;

  actived?: AnyDto<T>;
  activedColumn?: WpxTableColumn<T>;

  y = signal<number>(0);
  private resizeObserver!: ResizeObserver;

  constructor(
    private contextMenu: NzContextMenuService,
    private modal: NzModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.wpxColumns.forEach((value, index) => {
      this.columns[index] = {
        ...value,
        display: true,
        width: '240px'
      };
    });

    console.log(this.columns);

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

  openManager($event: MouseEvent, menu: NzDropdownMenuComponent, data: WpxTableColumn<T>): void {
    this.activedColumn = data;
    this.contextMenu.create($event, menu);
  }

  displayAll(): void {
    this.columns.forEach(v => (v.display = true));
  }

  hide(column: WpxTableColumn<T>): void {
    column.display = false;
  }

  openSettings(): void {
    this.settings = true;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  closeSettings(): void {
    this.settings = false;
  }

  resize({ width }: NzResizeEvent, column: WpxTableColumn<T>): void {
    column.width = `${width}px`;
  }
}
