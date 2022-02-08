import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Field } from '@weplanx/common';

@Component({
  selector: 'wpx-form',
  templateUrl: './form.component.html'
})
export class WpxFormComponent implements OnInit {
  @Input() wpxFields!: Field[];
  @Input() wpxRules!: any[];

  form?: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const controlsConfig: Record<string, any[]> = {};
    for (const x of this.wpxFields) {
      const validator: any[] = [];
      if (x.required) {
        validator.push(Validators.required);
      }
      controlsConfig[x.key] = [x.default, validator];
    }
    this.form = this.fb.group(controlsConfig);
  }

  submit(data: any): void {}
}
