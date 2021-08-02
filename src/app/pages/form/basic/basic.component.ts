import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  form!: FormGroup;
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      description: [null, [Validators.required]],
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
