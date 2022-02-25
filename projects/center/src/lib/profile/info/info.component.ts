import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';

import { CenterService } from '../../center.service';

@Component({
  selector: 'wpx-center-profile-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private center: CenterService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null],
      avatar: [null],
      region: [null],
      city: [[]],
      address: [null],
      introduction: [null],
      phone: this.fb.array([]),
      email: this.fb.array([])
    });
    this.center.getUserInfo().subscribe(v => {
      this.form.patchValue(v);
      for (const vv of v.phone) {
        this.addPhone(vv);
      }
      for (const vv of v.email) {
        this.addEmail(vv);
      }
    });
  }

  get phone(): FormArray {
    return this.form?.get('phone') as FormArray;
  }

  addPhone(value?: any): void {
    this.phone.push(
      this.fb.group({
        area: [null, [Validators.required]],
        number: [null, [Validators.required]]
      })
    );
  }

  removePhone(index: number): void {
    this.phone.removeAt(index);
  }

  get email(): FormArray {
    return this.form?.get('email') as FormArray;
  }

  addEmail(value?: string): void {
    this.email.push(this.fb.control(value, [Validators.required, Validators.email]));
  }

  removeEmail(index: number): void {
    this.email.removeAt(index);
  }

  submit(data: any): void {
    console.log(data);
    this.center.setUserInfo(data).subscribe(() => {
      this.message.success('数据更新完成');
    });
  }
}
