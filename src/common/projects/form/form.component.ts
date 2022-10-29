import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AnyDto, WpxService } from '@weplanx/ng';
import { nanoid } from 'nanoid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-form',
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
      secret: [],
      expire_time: [null],
      entry: this.fb.array([]),
      status: [true]
    });
    if (this.doc) {
      this.form.patchValue(this.doc);
    }
  }

  /**
   * 入口白名单
   */
  get entry(): UntypedFormArray {
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
    if (!this.doc) {
      this.projects
        .create(value, {
          xdata: {
            expire_time: 'date'
          }
        })
        .subscribe(() => {
          this.message.success('数据新增完成');
          this.modalRef.triggerOk();
        });
    } else {
      this.projects
        .updateById(
          this.doc._id,
          {
            $set: value
          },
          {
            xdata: {
              '$set.expire_time': 'date'
            }
          }
        )
        .subscribe(() => {
          this.message.success('数据更新完成');
          this.modalRef.triggerOk();
        });
    }
  }
}
