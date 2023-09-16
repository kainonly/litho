import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Any } from '@weplanx/ng';

@Component({
  selector: 'x-code-editor',
  templateUrl: './code-editor.component.html'
})
export class CodeEditorComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      content: []
    });
  }

  submit(value: Any): void {
    console.log(value);
  }
}
