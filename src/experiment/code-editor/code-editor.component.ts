import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ShareModule } from '@common/share.module';
import { Any } from '@weplanx/ng';

@Component({
  standalone: true,
  imports: [ShareModule],
  selector: 'x-code-editor',
  templateUrl: './code-editor.component.html'
})
export class CodeEditorComponent {
  form: FormGroup = this.fb.group({
    content: []
  });

  constructor(private fb: FormBuilder) {}

  submit(value: Any): void {
    console.log(value);
  }
}
