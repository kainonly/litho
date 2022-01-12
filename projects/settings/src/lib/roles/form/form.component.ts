import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { RolesService } from '../roles.service';

@Component({
  selector: 'wpx-settings-roles-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() editable?: any;
  form?: FormGroup;

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private roles: RolesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      key: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)], [this.existsKey]],
      status: [true, [Validators.required]],
      description: [],
      labels: this.fb.array([])
    });
    if (this.editable) {
      this.form.patchValue(this.editable);
    }
  }

  existsKey = (control: AbstractControl): any => {
    if (control.value === this.editable?.key) {
      return null;
    }
    return this.roles.hasKey(control.value);
  };

  get labels(): FormArray {
    return this.form?.get('labels') as FormArray;
  }

  addValues(): void {
    this.labels.push(
      this.fb.group({
        label: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

  removeValues(index: number): void {
    this.labels.removeAt(index);
  }

  close(): void {
    this.modal.triggerCancel();
  }

  submit(data: any): void {
    if (!this.editable) {
      this.roles.create(data).subscribe(v => {
        this.message.success('数据新增完成');
        this.modal.triggerOk();
      });
    } else {
      this.roles.updateOneById(this.editable._id, data).subscribe(v => {
        this.message.success('数据更新完成');
        this.modal.triggerOk();
      });
    }
  }
}
