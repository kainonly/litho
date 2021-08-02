import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      title: [null],
      date: [null],
      description: [null],
      standard: [null],
      customer: [null],
      staff: [null],
      weights: [0],
      privacy: [0]
    });
  }

  submit(data: any): void {
    console.log(data);
  }
}
