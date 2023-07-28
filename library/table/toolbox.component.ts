import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Any, WpxModel } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'wpx-toolbox',
  template: `
    <nz-button-group>
      <button *ngIf="wpxSearchForm" nz-button nzType="text" nz-tooltip="高级检索" (click)="open()">
        <i nz-icon nzType="filter" nzTheme="outline"></i>
      </button>
      <button nz-button nzType="text" nz-tooltip="清除查询" (click)="clear()">
        <i nz-icon nzType="clear" nzTheme="outline"></i>
      </button>
      <button nz-button nzType="text" nz-tooltip="刷新数据" (click)="refresh()">
        <i nz-icon nzType="reload" nzTheme="outline"></i>
      </button>
    </nz-button-group>

    <ng-template #searchBtnRef>
      <nz-space *ngIf="wpxSearchForm">
        <button *nzSpaceItem nz-button nzType="primary" form="search" [disabled]="!wpxSearchForm.valid">查询</button>
        <button *nzSpaceItem nz-button type="button" (click)="close()">关闭</button>
      </nz-space>
    </ng-template>
    <ng-template #searchContentRef>
      <ng-content></ng-content>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .ant-drawer-bottom.ant-drawer-open.no-mask {
        pointer-events: none;
      }

      .ant-drawer-content-wrapper {
        pointer-events: auto;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxToolboxComponent<T> {
  @ViewChild('searchBtnRef') searchBtnRef!: TemplateRef<Any>;
  @ViewChild('searchContentRef') searchContentRef!: TemplateRef<Any>;

  @Input({ required: true }) wpxModel!: WpxModel<T>;
  @Input() wpxSearchHeight = 340;
  @Input() wpxSearchForm?: FormGroup;
  @Input() wpxSearchTitle?: TemplateRef<Any>;
  @Output() wpxClear = new EventEmitter<void>();
  @Output() wpxRefresh = new EventEmitter<void>();

  constructor(private drawer: NzDrawerService) {}

  open(): void {
    if (this.wpxModel.advanced()) {
      this.close();
      return;
    }
    this.wpxModel.advanced.set(
      this.drawer.create({
        nzTitle: !this.wpxSearchTitle ? '高级检索' : this.wpxSearchTitle,
        nzExtra: this.searchBtnRef,
        nzContent: this.searchContentRef,
        nzHeight: this.wpxSearchHeight,
        nzMask: false,
        nzMaskClosable: false,
        nzPlacement: 'bottom',
        nzClosable: false
      })
    );
  }

  close(): void {
    this.wpxModel.advanced()?.close();
    this.wpxModel.advanced.set(null);
  }

  clear(): void {
    this.wpxModel.searchText = '';
    this.wpxModel.keywords = [];
    this.wpxModel.page = 1;
    this.wpxClear.emit();
  }

  refresh(): void {
    this.wpxModel.page = 1;
    this.wpxRefresh.emit();
  }
}
