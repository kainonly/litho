import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Cluster } from '@common/models/cluster';
import { ClustersService } from '@common/services/clusters.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface FormInput {
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
        required: `集群名称不能为空`
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
    public data: FormInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private clusters: ClustersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      config: this.fb.group({
        host: ['', [Validators.required]],
        ca_data: ['', [Validators.required]],
        cert_data: ['', [Validators.required]],
        key_data: ['', [Validators.required]]
      })
    });
    if (this.data.doc) {
      this.form.patchValue({
        name: this.data.doc.name,
        kind: this.data.doc.kind
      });
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    data.config = JSON.stringify(data.config);
    if (!this.data.doc) {
      data.kind = 'kubernetes';
      this.clusters
        .create(data, {
          xdata: { config: 'cipher' }
        })
        .subscribe(() => {
          this.message.success(`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      this.clusters
        .updateById(
          this.data.doc._id,
          { $set: data },
          {
            xdata: { '$set->config': 'cipher' }
          }
        )
        .subscribe(() => {
          this.message.success(`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
