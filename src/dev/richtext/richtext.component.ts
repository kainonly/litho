import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RichtextValue } from '@weplanx/ng/richtext';

@Component({
  selector: 'dev-richtext',
  templateUrl: './richtext.component.html'
})
export class RichtextComponent implements OnInit {
  /**
   * 表单
   */
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      content: [
        // <RichtextValue>{
        //   title: 'asd',
        //   blocks: [],
        //   time: 0,
        //   version: '2.24.3'
        // }
      ]
    });
  }

  submit(value: any): void {
    console.log(value);
  }
}
