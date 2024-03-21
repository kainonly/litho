import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
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
import { FormsModule } from '@angular/forms';

import { Any, AnyDto, WpxModel, WpxModule, WpxStoreService } from '@weplanx/ng';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
import { NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzResizableModule, NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { Column, Preferences, Scroll, WpxColumn } from './types';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSpaceModule,
    NzToolTipModule,
    NzGridModule,
    NzDropDownModule,
    NzDrawerModule,
    NzMessageModule,
    NzCheckboxModule,
    NzSwitchModule,
    NzResizableModule,
    NzBadgeModule,
    DragDropModule,
    WpxModule
  ],
  selector: 'wpx-table',
  exportAs: 'wpxTable',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxTableComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) wpxModel!: WpxModel<T>;
  @Input({ required: true }) wpxColumns!: WpxColumn<T>[];
  @Input({ required: true }) wpxAction!: TemplateRef<{ $implicit: AnyDto<T> }>;
  @Input() wpxTitle?: TemplateRef<void>;
  @Input() wpxExtra?: TemplateRef<void>;
  @Input() wpxX?: string;
  @Input() wpxBodyStyle: NgStyleInterface | null = { height: 'calc(100% - 64px)' };
  @Output() wpxChange = new EventEmitter<void>();

  @ViewChild(NzTableComponent, { read: ElementRef, static: true }) basicTableRef!: ElementRef;
  @ViewChild('settingsExtraRef') settingsExtraRef!: TemplateRef<Any>;
  @ViewChild('settingsContentRef') settingsContentRef!: TemplateRef<Any>;

  columns: Column<T>[] = [];
  scroll = signal<Scroll>({ y: '0px' });
  settings = signal<NzDrawerRef | null>(null);
  private resizeObserver!: ResizeObserver;

  constructor(
    private store: WpxStoreService,
    private drawer: NzDrawerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store.get<Map<string, Preferences<T>>>(`${this.wpxModel.key}:preferences`).subscribe(data => {
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
        const { width, height } = entry.contentRect;
        this.scroll.set({
          x: this.wpxX ?? width - 24 + 'px',
          y: height - 128 + 'px'
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.basicTableRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.closeSettings();
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

  clearSelections(): void {
    this.wpxModel.checked = false;
    this.wpxModel.indeterminate = false;
    this.wpxModel.selection.clear();
    this.cdr.detectChanges();
  }

  openSettings(): void {
    if (this.settings()) {
      this.closeSettings();
      return;
    }
    this.settings.set(
      this.drawer.create({
        nzTitle: `Table Style`,
        nzExtra: this.settingsExtraRef,
        nzContent: this.settingsContentRef,
        nzHeight: 200,
        nzMask: false,
        nzMaskClosable: false,
        nzPlacement: 'bottom',
        nzClosable: false
      })
    );
  }

  closeSettings(): void {
    this.settings()?.close();
    this.settings.set(null);
  }

  drop(event: CdkDragDrop<string[]>): void {
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
    this.updatePreferences();
  }

  updatePreferences(): void {
    this.store
      .set<Map<string, Preferences<T>>>(
        `${this.wpxModel.key}:preferences`,
        new Map([
          ...this.columns.map<[string, Preferences<T>]>((value, index) => [
            value.key as string,
            {
              display: value.display,
              width: value.width,
              sort: index
            }
          ])
        ])
      )
      .subscribe(() => {
        this.cdr.detectChanges();
      });
  }

  initPreferences(): void {
    this.store.remove(`${this.wpxModel.key}:preferences`).subscribe(() => {
      this.initColumns();
      this.cdr.detectChanges();
    });
  }
}
