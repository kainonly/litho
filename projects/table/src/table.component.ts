import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AnyDto } from '@weplanx/ng';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzTableComponent } from 'ng-zorro-antd/table';

import { WpxColumns, TableQuery } from './types';

@Component({
  selector: 'wpx-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxTableComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('block', { read: ElementRef, static: true }) block!: ElementRef;
  @ViewChild('box', { static: true }) box!: ElementRef;
  @ViewChild('tb', { static: true }) tb!: NzTableComponent<unknown>;
  @Input({ required: true }) wpxColumns!: WpxColumns<T>[];
  @Input({ required: true }) wpxData!: Array<AnyDto<T>>;
  @Input({ required: true }) wpxItemSize!: number;
  // @Input() wpxSearch?: TemplateRef<unknown>;
  @Input() wpxExtra?: TemplateRef<unknown>;
  @ContentChild('wpx-table-search') wpxSearch?: TemplateRef<unknown>;
  @Input() wpxActions?: TemplateRef<{ $implicit: T }>;
  @Input() wpxPagesize = 100;
  @Output() wpxQuery: EventEmitter<TableQuery> = new EventEmitter<TableQuery>();

  y!: number;
  checked = false;
  indeterminate = false;
  selection: Map<string, T> = new Map<string, T>();

  private destroy$ = new Subject<boolean>();
  private resizeObserver!: ResizeObserver;
  private indexs: Set<number> = new Set<number>();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.calculate(entry.contentRect.height);
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.block.nativeElement);
    const viewport = this.tb.cdkVirtualScrollViewport;
    if (viewport) {
      viewport.scrolledIndexChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
        const range = viewport.getRenderedRange();
        const index = Math.floor(range.end / this.wpxPagesize) + 1;
        if (this.indexs.has(index)) {
          return;
        }
        this.wpxQuery.emit({ index });
        this.indexs.add(index);
        this.indeterminate = this.checked;
        this.checked = false;
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.resizeObserver.disconnect();
  }

  private calculate(height: number): void {
    this.y = height - this.box.nativeElement.offsetHeight - this.wpxItemSize - 60;
    this.cd.detectChanges();
  }

  setSelection(data: AnyDto<T>): void {
    this.selection.set(data._id, data);
    this.updateChange();
  }

  removeSelection(id: string): void {
    this.selection.delete(id);
    this.updateChange();
  }

  setCurrentSelection(checked: boolean): void {
    this.wpxData
      .filter(v => !v['_disabled'])
      .forEach(v => (checked ? this.setSelection(v) : this.removeSelection(v._id)));
    this.updateChange();
  }

  clearSelection(): void {
    this.checked = false;
    this.indeterminate = false;
    this.selection.clear();
  }

  private updateChange(): void {
    const data = this.wpxData.filter(v => !v['_disabled']);
    this.checked = data.every(v => this.selection.has(v._id));
    this.indeterminate = !this.checked ? data.some(v => this.selection.has(v._id)) : false;
  }
}
