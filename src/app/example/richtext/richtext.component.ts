import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-example-richtext',
  templateUrl: './richtext.component.html'
})
export class RichtextComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      text: []
    });
  }

  submit(data: any): void {
    console.log(data);
  }
}
