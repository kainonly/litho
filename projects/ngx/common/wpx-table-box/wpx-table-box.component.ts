import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NzTableSize } from 'ng-zorro-antd/table/src/table.types';

@Component({
  selector: 'wpx-table-box',
  template: `
    <nz-button-group>
      <button nz-button nzType="text" nz-tooltip="刷新" (click)="refresh.emit()">
        <i nz-icon nzType="reload"></i>
      </button>
      <button
        nz-button
        nzType="text"
        nz-tooltip="密度"
        nz-popover
        nzPopoverPlacement="bottomRight"
        nzPopoverTrigger="click"
        nzPopoverTitle="设置密度"
        [nzPopoverContent]="sizePopover"
      >
        <i nz-icon nzType="column-height"></i>
        <ng-template #sizePopover>
          <nz-radio-group [ngModel]="size">
            <label nz-radio-button nzValue="default">默认</label>
            <label nz-radio-button nzValue="middle">中等</label>
            <label nz-radio-button nzValue="small">紧凑</label>
          </nz-radio-group>
        </ng-template>
      </button>
      <!--      <button-->
      <!--        nz-button-->
      <!--        nzType="text"-->
      <!--        nz-tooltip="列设置"-->
      <!--        nz-popover-->
      <!--        nzPopoverPlacement="bottomRight"-->
      <!--        nzPopoverTrigger="click"-->
      <!--        [nzPopoverTitle]="fieldPopoverTitle"-->
      <!--        [nzPopoverContent]="fieldPopoverContent"-->
      <!--      >-->
      <!--        <i nz-icon nzType="setting"></i>-->
      <!--        <ng-template #fieldPopoverTitle>-->
      <!--          <label-->
      <!--            nz-checkbox-->
      <!--            [(ngModel)]="columnsChecked"-->
      <!--            (ngModelChange)="updateColumnsChecked()"-->
      <!--            [nzIndeterminate]="columnsIndeterminate"-->
      <!--          >-->
      <!--            全部展示-->
      <!--          </label>-->
      <!--        </ng-template>-->
      <!--        <ng-template #fieldPopoverContent>-->
      <!--          <nz-checkbox-group [(ngModel)]="columns" (ngModelChange)="updateColumnChecked()"></nz-checkbox-group>-->
      <!--        </ng-template>-->
      <!--      </button>-->
    </nz-button-group>
  `
})
export class WpxTableBoxComponent {
  @Input() size!: NzTableSize;
  @Output() readonly refresh: EventEmitter<undefined> = new EventEmitter<undefined>();
}
