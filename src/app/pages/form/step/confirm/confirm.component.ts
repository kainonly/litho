import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-step-confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {
  @Input() data!: any;
  @Output() readonly ok: EventEmitter<any> = new EventEmitter();
  @Output() readonly cancel: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;
  visible = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, [Validators.required]]
    });
  }

  submit(data: any): void {
    this.ok.emit(data);
  }

  reset(): void {
    this.cancel.emit();
  }
}
