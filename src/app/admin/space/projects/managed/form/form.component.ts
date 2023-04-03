import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { Project } from '@common/interfaces/project';
import { ProjectsService } from '@common/services/projects.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { nanoid } from 'nanoid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-space-projects-managed-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  tips = {
    name: {
      default: {
        required: $localize`项目名称不能为空`,
        duplicated: $localize`存在重复的定义，项目名称必须是唯一的`
      }
    },
    namespace: {
      default: {
        required: $localize`命名空间不能为空`,
        duplicated: $localize`存在重复的定义，命名空间必须是唯一的`
      }
    }
  };
  @Input() doc?: AnyDto<Project>;
  form!: FormGroup;

  expireDisableDate = (current: Date): boolean => {
    return current < new Date();
  };

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private projects: ProjectsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required], [this.existsName]],
      namespace: ['', [Validators.required], [this.existsNamespace]],
      secret: [''],
      expire: [0],
      entry: this.fb.array([]),
      status: [true]
    });
    if (this.doc) {
      const value: any = { ...this.doc };
      if (value.expire !== 0) {
        value.expire = new Date(value.expire * 1000);
      }
      this.form.patchValue(value);
    }
  }

  get entry(): FormArray {
    return this.form?.get('entry') as FormArray;
  }

  addEntry(value?: string): void {
    this.entry.push(
      this.fb.control(value, [
        Validators.required,
        Validators.pattern(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        )
      ])
    );
  }

  removeEntry(index: number): void {
    this.entry.removeAt(index);
  }

  existsName = (control: AbstractControl): Observable<any> => {
    if (control.value === this.doc?.name) {
      return of(null);
    }
    return this.projects.existsName(control.value);
  };

  existsNamespace = (control: AbstractControl): Observable<any> => {
    if (control.value === this.doc?.namespace) {
      return of(null);
    }
    return this.projects.existsNamespace(control.value);
  };

  randomSecret(): void {
    this.form.get('secret')?.setValue(nanoid());
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    if (value.expire) {
      const expire = value.expire as Date;
      expire.setHours(0);
      expire.setMinutes(0);
      expire.setSeconds(0);
      value.expire = Math.floor(expire.getTime() / 1000);
    } else {
      value.expire = 0;
    }
    if (!this.doc) {
      this.projects.create(value).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.projects.updateById(this.doc._id, { $set: value }).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}
