import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cms-example',
  templateUrl: './cms-example.component.html'
})
export class CmsExampleComponent implements OnInit {
  form: FormGroup;

  constructor(
    public bit: BitService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales({});
    const mock1 = [];
    const mock2 = [];
    this.form = this.fb.group({
      // picture: [mock1],
      // video: [mock2],
      richtext: []
    });
  }

  submit(data): void {
    console.log(data);
  }
}
