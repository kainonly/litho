import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ProjectsService } from '@common/projects.service';
import { Project } from '@common/types';
import { AnyDto, WpxService } from '@weplanx/ng';
import { nanoid } from 'nanoid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-projects-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() doc?: AnyDto<Project>;
  /**
   * 表单
   */
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

  /**
   * 入口白名单
   */
  get entry(): FormArray {
    return this.form?.get('entry') as FormArray;
  }

  /**
   * 新增入口
   * @param value
   */
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

  /**
   * 移除入口
   * @param index
   */
  removeEntry(index: number): void {
    this.entry.removeAt(index);
  }

  /**
   * 验证权限组名称是否存在
   * @param control
   */
  existsName = (control: AbstractControl): Observable<any> => {
    if (control.value === this.doc?.name) {
      return of(null);
    }
    return this.projects.existsName(control.value);
  };

  /**
   * 验证权限组名称是否存在
   * @param control
   */
  existsNamespace = (control: AbstractControl): Observable<any> => {
    if (control.value === this.doc?.namespace) {
      return of(null);
    }
    return this.projects.existsNamespace(control.value);
  };

  /**
   * 随机生成密钥
   */
  randomSecret(): void {
    this.form.get('secret')?.setValue(nanoid());
  }

  /**
   * 关闭表单
   */
  close(): void {
    this.modalRef.triggerCancel();
  }

  /**
   * 提交
   * @param value
   */
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
        this.message.success('数据新增完成');
        this.modalRef.triggerOk();
      });
    } else {
      this.projects.updateById(this.doc._id, { $set: value }).subscribe(() => {
        this.message.success('数据更新完成');
        this.modalRef.triggerOk();
      });
    }
  }
}
