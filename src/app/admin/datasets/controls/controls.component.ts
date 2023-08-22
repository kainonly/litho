import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-datasets-controls',
  templateUrl: './controls.component.html'
})
export class ControlsComponent implements OnInit {
  form!: FormGroup;

  private controls: Any;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public name: string,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private wpx: WpxService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Status: [true, [Validators.required]],
      Event: [false, [Validators.required]],
      Keys: this.fb.array([])
    });
    this.wpx.getValues(['RestControls']).subscribe(data => {
      this.controls = data['RestControls'];
      const v = data['RestControls'][this.name];
      (v.Keys as string[])?.forEach(v => this.append(v));
      this.form.patchValue(v);
    });
  }

  get keys(): FormArray {
    return this.form!.get('Keys') as FormArray;
  }

  append(value?: string): void {
    this.keys.push(this.fb.control(value, [Validators.required]));
  }

  remove(index: number): void {
    this.keys.removeAt(index);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.controls[this.name] = data;
    this.wpx.setValues({ RestControls: this.controls }).subscribe(() => {
      this.message.success(`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
