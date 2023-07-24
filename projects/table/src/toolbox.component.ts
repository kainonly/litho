import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Any, WpxModel } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';

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

    <nz-drawer
      *ngIf="wpxSearchForm"
      [nzTitle]="!wpxSearchTitle ? '高级检索' : wpxSearchTitle"
      [nzExtra]="searchBtnRef"
      [nzHeight]="wpxSearchHeight"
      [nzMask]="false"
      [nzMaskClosable]="false"
      [nzPlacement]="'bottom'"
      [nzClosable]="false"
      [nzVisible]="wpxModel.advanced()"
    >
      <ng-template #searchBtnRef>
        <nz-space>
          <button *nzSpaceItem nz-button nzType="primary" form="search" [disabled]="!wpxSearchForm.valid">查询</button>
          <button *nzSpaceItem nz-button type="button" (click)="close()">关闭</button>
        </nz-space>
      </ng-template>
      <ng-container *nzDrawerContent>
        <ng-content></ng-content>
      </ng-container>
    </nz-drawer>
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
  ]
})
export class WpxToolboxComponent<T> {
  @Input({ required: true }) wpxModel!: WpxModel<T>;
  @Input() wpxSearchHeight = 340;
  @Input() wpxSearchForm?: FormGroup;
  @Input() wpxSearchTitle?: TemplateRef<Any>;
  @Output() wpxClear = new EventEmitter<void>();
  @Output() wpxRefresh = new EventEmitter<void>();

  constructor(private message: NzMessageService) {}

  open(): void {
    if (this.wpxModel.advanced()) {
      this.close();
      return;
    }
    this.wpxModel.advanced.set(true);
  }

  close(): void {
    this.wpxModel.advanced.set(false);
  }

  clear(): void {
    this.wpxModel.searchText = '';
    this.wpxModel.keywords = [];
    this.wpxModel.page = 1;
    this.message.success('正在清除查询');
    this.wpxClear.emit();
  }

  refresh(): void {
    this.wpxModel.page = 1;
    this.message.success('正在刷新数据');
    this.wpxRefresh.emit();
  }
}
