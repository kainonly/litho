import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wpx-center-profile-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [],
      avatar: [],
      region: [],
      city: [],
      address: [],
      introduction: [],
      tel: this.fb.array([]),
      email: this.fb.array([])
    });
  }

  get tel(): FormArray {
    return this.form?.get('tel') as FormArray;
  }

  addTel(value?: any): void {
    this.tel.push(
      this.fb.group({
        area: [null, [Validators.required]],
        number: [null, [Validators.required]]
      })
    );
  }

  removeTel(index: number): void {
    this.tel.removeAt(index);
  }

  get email(): FormArray {
    return this.form?.get('email') as FormArray;
  }

  addEmail(value?: string): void {
    this.email.push(this.fb.control(value, [Validators.required, Validators.email]));
  }

  removeEmail(index: number): void {
    this.email.removeAt(index);
  }

  submit(data: any): void {
    console.log(data);
  }
}
