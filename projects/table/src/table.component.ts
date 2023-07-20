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
import { NzTableComponent } from 'ng-zorro-antd/table';

import { WpxColumns } from './types';

@Component({
  selector: 'wpx-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxTableComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('block', { read: ElementRef, static: true }) block!: ElementRef;
  @ViewChild('box', { static: true }) box!: ElementRef;
  @ViewChild('basicTable', { static: true }) basicTable!: NzTableComponent<unknown>;

  @Input({ required: true }) wpxColumns!: WpxColumns<T>[];
  @Input({ required: true }) wpxModel!: WpxModel<T>;
  @Input({ required: true }) wpxItemSize!: number;
  @Input() wpxOffset = 0;
  @Input() wpxActions?: NzDropdownMenuComponent;
  @Output() wpxChange = new EventEmitter<void>();

  actived?: AnyDto<T>;

  y = signal<number>(0);
  private resizeObserver!: ResizeObserver;

  constructor(
    private contextMenu: NzContextMenuService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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

  openActions($event: MouseEvent, data: AnyDto<T>): void {
    if (this.wpxActions) {
      this.actived = data;
      this.contextMenu.create($event, this.wpxActions);
    }
  }

  clearSelections(): void {
    this.wpxModel.checked = false;
    this.wpxModel.indeterminate = false;
    this.wpxModel.selection.clear();
    this.cdr.detectChanges();
  }
}
