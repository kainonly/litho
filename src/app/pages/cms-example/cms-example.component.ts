import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BitService } from 'ngx-bit';

import * as packer from './language';

@Component({
  selector: 'app-cms-example',
  templateUrl: './cms-example.component.html'
})
export class CmsExampleComponent implements OnInit {
  form!: FormGroup;

  constructor(public bit: BitService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
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
