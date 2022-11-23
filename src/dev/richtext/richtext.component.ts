import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RichtextData } from '@weplanx/ng/richtext';

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
      content: []
    });
    setTimeout(() => {
      this.form.patchValue({
        content: <RichtextData>{
          blocks: [
            {
              data: { text: 'asdasddada' },
              id: 'AhGrg_O60T',
              type: 'paragraph'
            }
          ],
          time: 1669196916656,
          version: '2.24.3'
        }
      });
    }, 1000);
    setTimeout(() => {
      this.form.patchValue({
        content: <RichtextData>{
          blocks: [
            {
              data: { text: 'ssssswwwe' },
              id: 'AhGrg_O60T',
              type: 'paragraph'
            }
          ],
          time: 1669196916656,
          version: '2.24.3'
        }
      });
    }, 3000);
  }

  submit(value: any): void {
    console.log(value);
  }

  test(value: any): void {
    console.log(value);
  }
}
