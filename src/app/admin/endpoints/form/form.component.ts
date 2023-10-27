import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Endpoint } from '@common/models/endpoint';
import { EndpointsService } from '@common/services/endpoints.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface FormInput {
  doc?: AnyDto<Endpoint>;
}

@Component({
  selector: 'app-admin-endpoints-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    name: {
      default: {
        required: `服务名称不能为空`
      }
    },
    schedule_node: {
      default: {
        required: `节点命名不能为空`,
        pattern: `仅允许小写字母、数子、下划线`
      }
    }
  };
  kinds = [{ label: 'Schedule', key: 'schedule' }];
  kind?: string;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: FormInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private endpoints: EndpointsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      kind: [null, [Validators.required]]
    });
    if (this.data.doc) {
      this.kindExtend(this.data.doc!.kind);
      this.form.patchValue(this.data.doc);
    }
    this.form.get('kind')!.valueChanges.subscribe(data => {
      this.kindExtend(data);
    });
  }

  private kindExtend(data: string): void {
    switch (data) {
      case 'schedule':
        this.form.removeControl('emqx');
        this.form.addControl(
          'schedule',
          this.fb.group({
            node: ['', [Validators.required, Validators.pattern(/[_a-z0-9]+/)]]
          })
        );
        break;
    }
    this.kind = data;
  }

  schedulePing(): void {
    const node = this.form.get('schedule')?.get('node')?.value;
    if (!node) {
      return;
    }
    this.endpoints.schedulePing([node]).subscribe(data => {
      if (data[node]) {
        this.message.success(`节点连通测试成功`);
      }
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    if (!this.data.doc) {
      this.endpoints.create(data).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      const $unset: Any = {};
      this.kinds.forEach(v => {
        if (v.key !== data.kind) {
          $unset[v.key] = 1;
        }
      });
      this.endpoints.updateById(this.data.doc._id, { $set: data, $unset }).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}
