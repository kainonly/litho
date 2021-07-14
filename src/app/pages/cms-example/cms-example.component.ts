import { Component, OnInit } from '@angular/core';
import { Bit } from 'ngx-bit';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cms-example',
  templateUrl: './cms-example.component.html'
})
export class CmsExampleComponent implements OnInit {
  form!: FormGroup;

  constructor(public bit: Bit, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
    this.form = this.fb.group({
      picture: [],
      video: [],
      richtext: []
    });
  }

  submit(data: any): void {
    console.log(data);
  }
}
