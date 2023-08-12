import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Cluster } from '@common/models/cluster';
import { ClustersService } from '@common/services/clusters.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface ModalData {
  doc?: AnyDto<Cluster>;
}

@Component({
  selector: 'app-admin-clusters-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    name: {
      default: {
        required: `项目名称不能为空`
      }
    },
    config: {
      default: {
        required: `配置不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: ModalData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private clusters: ClustersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      kind: ['kubernetes', [Validators.required]],
      config: ['', [Validators.required]]
    });
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    if (!this.data.doc) {
      this.clusters.create(data).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.clusters.updateById(this.data.doc._id, { $set: data }).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}
