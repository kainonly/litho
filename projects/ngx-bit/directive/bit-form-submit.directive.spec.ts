/* tslint:disable:component-class-suffix */
import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BitDirectiveModule } from 'ngx-bit/directive';
import { environment } from '../simulation/environment';
import { BitConfigService, BitEventsService, BitHttpService, BitService, BitSupportService, BitSwalService } from 'ngx-bit';

describe('BitFormSubmitDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [
          TestComponent
        ],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          BitDirectiveModule
        ],
        providers: [
          BitService,
          BitHttpService,
          BitEventsService,
          BitSupportService,
          BitSwalService,
          {
            provide: BitConfigService, useFactory: () => {
              const env = environment.bit;
              const service = new BitConfigService();
              Reflect.ownKeys(env).forEach(key => {
                service[key] = env[key];
              });
              return service;
            }
          }
        ]
      });
      fixture = TestBed.createComponent(TestComponent);
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
    expect(component.resultValue).toEqual({
      name: 'kain',
      email: 'zhangtqx@vip.qq.com',
      status: 1
    });
  });
});

@Component({
  template: `
    <form [formGroup]="form" (bitFormSubmit)="submit($event)">
      <input formControlName="name" />
      <input formControlName="email" />
    </form>
  `
})
class TestComponent implements OnInit {
  form: FormGroup;
  resultValue: any;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [],
      status: [1, [Validators.required]]
    });
  }

  submit(data): void {
    this.resultValue = data;
  }
}
