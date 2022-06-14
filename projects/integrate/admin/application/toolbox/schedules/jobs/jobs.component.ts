import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import validator from 'validator';

import { SchedulesService } from '../schedules.service';
import { Schedule } from '../types';

@Component({
  selector: 'wpx-admin-toolbox-schedules-jobs',
  templateUrl: './jobs.component.html'
})
export class JobsComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() doc!: AnyDto<Schedule>;
  /**
   * 表单
   */
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private schedules: SchedulesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      jobs: this.fb.array([])
    });
    this.form.patchValue(this.doc.jobs);
  }

  /**
   * 任务
   */
  get jobs(): FormArray {
    return this.form.get('jobs') as FormArray;
  }

  /**
   * 新增任务
   */
  addJob(): void {
    this.jobs.push(
      this.fb.group({
        mode: ['HTTP', [Validators.required]],
        spec: [null, [Validators.required]],
        option: this.fb.group({
          url: [null, [this.isUrl]],
          headers: this.fb.array([]),
          body: ['{}', [this.isJSON]]
        })
      })
    );
  }

  /**
   * 是否为 URL
   * @param control
   */
  isUrl = (control: AbstractControl): any => {
    if (!control.value) {
      return { required: true };
    }
    if (!validator.isURL(control.value)) {
      return { error: true, not_url: true };
    }
    return null;
  };

  /**
   * 是否为 JSON
   * @param control
   */
  isJSON = (control: AbstractControl): any => {
    if (!control.value) {
      return { required: true };
    }
    if (!validator.isJSON(control.value)) {
      return { error: true, not_json: true };
    }
    return null;
  };

  /**
   * 移除任务
   * @param index
   */
  removeJob(index: number): void {
    this.jobs.removeAt(index);
  }

  /**
   * 头部
   * @param job
   */
  headers(job: AbstractControl): FormArray {
    return job.get('option')?.get('headers') as FormArray;
  }

  /**
   * 新增头部
   */
  addHeader(control: FormArray): void {
    control.push(
      this.fb.group({
        key: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

  /**
   * 移除头部
   * @param control
   * @param index
   */
  removeHeader(control: FormArray, index: number): void {
    control.removeAt(index);
  }

  /**
   * 关闭表单
   */
  close(): void {
    this.modalRef.triggerCancel();
  }

  /**
   * 提交
   * @param data
   */
  submit(data: any): void {
    // const jobs: any[] = [];
    // for (const job of data.jobs) {
    //   const data = { ...job };
    //   if (data.option?.headers) {
    //     const headers: Record<string, string> = {};
    //     for (const x of data.option.headers) {
    //       headers[x.key] = x.value;
    //     }
    //     data.option.headers = headers;
    //   }
    //   if (data.option?.body) {
    //     data.option.body = JSON.parse(data.option.body);
    //   }
    //   jobs.push(data);
    // }
    console.log(data.jobs);

    // this.schedules.setJobs(this.doc._id, data.jobs).subscribe(() => {
    //   this.message.success('数据更新完成');
    //   this.modalRef.triggerOk();
    // });
  }
}
