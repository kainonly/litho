import { Component, Input, OnInit } from '@angular/core';

import { NzModalRef } from 'ng-zorro-antd/modal';
import { TransferItem } from 'ng-zorro-antd/transfer';

import { RolesService } from '../../roles.service';

@Component({
  selector: 'wpx-settings-roles-form-labels',
  template: `
    <nz-transfer nzShowSearch [nzTitles]="['已存在', '待导入']" [nzDataSource]="items"></nz-transfer>
    <div *nzModalFooter>
      <button nz-button nzType="default" (click)="close()">取消</button>
      <button nz-button nzType="primary" (click)="submit()">提交</button>
    </div>
  `
})
export class LabelComponent implements OnInit {
  @Input() exists: string[] = [];
  items: TransferItem[] = [];

  constructor(private modalRef: NzModalRef, private roles: RolesService) {}

  ngOnInit(): void {
    this.roles.findLabels().subscribe(data => {
      this.items = [
        ...data.map<TransferItem>(v => ({
          title: v,
          direction: 'left',
          disabled: this.exists.includes(v)
        }))
      ];
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(): void {
    this.modalRef.triggerOk();
  }
}
