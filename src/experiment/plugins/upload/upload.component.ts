import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'exp-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      avatar: [null]
    });
  }

  submit(data: any): void {
    console.log(data);
  }
}
