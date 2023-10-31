import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Builder } from '@common/models/builder';
import { BuildersService } from '@common/services/builders.service';
import { Any, AnyDto, Filter } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

export interface FormInput {
  doc?: AnyDto<Builder>;
}

@Component({
  selector: 'app-index-builders-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    name: {
      default: {
        required: `页面名称不能为空`
      }
    },
    kind: {
      default: {
        required: '页面种类不能为空'
      }
    }
  };
  nodes: NzTreeNodeOptions[] = [];

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: FormInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private app: AppService,
    private builders: BuildersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      parent: [null],
      name: ['', [Validators.required]],
      kind: ['', [Validators.required]],
      icon: [''],
      description: ['']
    });
    const filter: Filter<Builder> = { kind: 'nav' };
    if (this.data.doc) {
      filter._id = { $ne: this.data.doc._id };
      this.form.patchValue(this.data.doc);
    }
    this.builders
      .getNzTreeNodeOptions(
        filter,
        {
          '_id->$ne': 'oid'
        },
        v =>
          <NzTreeNodeOptions>{
            title: v.name,
            key: v._id,
            parent: v.parent,
            isLeaf: true
          }
      )
      .subscribe(v => {
        this.nodes = [...v];
      });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    if (!this.data.doc) {
      data['project'] = this.app.contextData!._id;
      data['sort'] = 0;
      this.builders.create(data, { xdata: { project: 'oid', parent: 'oid' } }).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.builders
        .updateById(
          this.data.doc._id,
          { $set: data },
          {
            xdata: { '$set->project': 'oid', '$set->parent': 'oid' }
          }
        )
        .subscribe(() => {
          this.message.success(`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
