import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-step-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  @Output() readonly ok: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      payment: ['ant-design@alipay.com', [Validators.required]],
      pay: ['alipay', [Validators.required]],
      receivable: ['test@example.com', [Validators.required]],
      payee: ['Alex', [Validators.required]],
      amount: [500, [Validators.required]]
    });
  }

  submit(data: any): void {
    this.ok.emit(data);
  }
}
