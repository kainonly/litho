import { Component, DebugElement, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WpxModule, WpxShareModule } from '@weplanx/common';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <form [formGroup]="form" (wpxSubmit)="submit($event)">
      <input formControlName="name" />
      <input formControlName="email" />
    </form>
  `
})
class ExampleComponent implements OnInit {
  form!: FormGroup;
  submitData?: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: []
    });
  }

  submit(data: any): void {
    this.submitData = data;
  }
}

describe('WpxSubmitDirective', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [ExampleComponent],
        imports: [WpxModule, WpxShareModule]
      });
      fixture = TestBed.createComponent(ExampleComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    }
  });

  it('Test form submit automatically markAsDirty and updateValueAndValidity', () => {
    const form = debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(component.form.valid).toBeFalsy();
    component.form.patchValue({
      name: 'kain',
      email: 'zhangtqx@vip.qq.com'
    });
    form.triggerEventHandler('submit', null);
    expect(component.form.valid).toBeTruthy();
    expect(component.submitData).toEqual({
      name: 'kain',
      email: 'zhangtqx@vip.qq.com'
    });
  });
});
