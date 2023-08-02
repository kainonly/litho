import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, AnyDto, WpxApi } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { WpxFile } from '../types';

@Component({
  selector: 'wpx-filebrowser-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    name: {
      default: {
        required: `名称不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: {
      doc: AnyDto<WpxFile>;
      api: WpxApi<WpxFile>;
    },
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });
    this.form.patchValue(this.data.doc);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.data.api
      .updateById(
        this.data.doc._id,
        {
          $set: data
        },
        {
          xdata: { '$set.tags': 'oids' }
        }
      )
      .subscribe(() => {
        this.data.doc.name = data.name;
        this.message.success(`数据更新完成`);
        this.modalRef.triggerOk();
      });
  }
}
