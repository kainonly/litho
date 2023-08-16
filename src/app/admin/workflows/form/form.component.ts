import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Workflow } from '@common/models/workflow';
import { WorkflowsService } from '@common/services/workflows.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface ModalData {
  doc?: AnyDto<Workflow>;
}

@Component({
  selector: 'app-admin-workflows-form',
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
    private workflows: WorkflowsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      kind: ['schedule', [Validators.required]]
    });
    if (this.data.doc) {
      this.setKindOption(this.data.doc.kind);
      this.form.patchValue({
        name: this.data.doc.name,
        kind: this.data.doc.kind
      });
    } else {
      this.setKindOption('schedule');
    }
    this.form.get('kind')!.valueChanges.subscribe(v => {
      this.form.removeControl('option');
      this.setKindOption(v);
    });
  }

  private setKindOption(kind: string): void {
    switch (kind) {
      case 'schedule':
        this.form.addControl('option', this.fb.group({}));
        break;
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    data.config = JSON.stringify(data.config);
    if (!this.data.doc) {
      this.workflows.create(data).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.workflows.updateById(this.data.doc._id, { $set: data }).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}
