import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BitI18nService } from 'ngx-bit/i18n';

@Component({
  selector: 'app-form-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  form!: FormGroup;
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');

  constructor(private fb: FormBuilder, public i18n: BitI18nService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.i18n.group({
        zh_cn: [null, [Validators.required]]
      }),
      date: [null, [Validators.required]],
      description: this.i18n.group({
        zh_cn: [null, [Validators.required]]
      }),
      standard: [null, [Validators.required]],
      customer: [null],
      staff: [null],
      weights: [0],
      privacy: [0, [Validators.required]]
    });
  }

  submit(data: any): void {
    console.log(data);
  }
}
