import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';

import { AppService } from '@app';
import { Project } from '@common/models/project';
import { ProjectsService } from '@common/services/projects.service';
import { Any, AnyDto } from '@weplanx/ng';
import Joi from 'joi';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface AuthorizationInput {
  doc: AnyDto<Project>;
}

@Component({
  selector: 'app-admin-projects-authorization',
  templateUrl: './authorization.component.html'
})
export class AuthorizationComponent implements OnInit {
  form!: FormGroup;

  private ipSchema = Joi.string().ip();

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: AuthorizationInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private projects: ProjectsService,
    private app: AppService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      secret_id: [''],
      secret_key: [''],
      entry: this.fb.array([])
    });
    this.data.doc.entry?.forEach(() => {
      this.append();
    });
    this.form.patchValue({ ...this.data.doc });
  }

  generateSecret(): void {
    this.app.generateSecret().subscribe(data => {
      this.form.patchValue({
        secret_id: data.id,
        secret_key: data.key
      });
    });
  }

  get list(): FormArray {
    return this.form?.get('entry') as FormArray;
  }

  append(): void {
    this.list.push(this.fb.control('', [this.checkIp]));
  }

  checkIp = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return { required: true };
    }
    if (this.ipSchema.validate(control.value).error) {
      return { error: true };
    }
    return {};
  };

  remove(index: number): void {
    this.list.removeAt(index);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.projects.updateById(this.data.doc._id, { $set: data }).subscribe(() => {
      this.message.success(`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
