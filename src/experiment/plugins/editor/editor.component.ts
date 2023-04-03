import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { data } from './data';

@Component({
  selector: 'exp-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      content: [data]
    });
  }

  submit(value: any): void {
    console.log(value);
  }
}
