import { Component, DebugElement, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WpxModule, WpxShareModule } from '@weplanx/ng';
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
  form!: UntypedFormGroup;
  submitData?: any;

  constructor(private fb: UntypedFormBuilder) {}

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

describe('测试 WpxSubmitDirective', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      imports: [WpxModule, WpxShareModule]
    });
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('提交后控件状态标记为 dirty ，并更新控件的验证器状态', () => {
    const form = debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(component.form.valid).toBeFalsy();
    component.form.patchValue({
      name: 'kain',
      email: 'kainonly@qq.com'
    });
    form.triggerEventHandler('submit', null);
    expect(component.form.valid).toBeTruthy();
    expect(component.submitData).toEqual({
      name: 'kain',
      email: 'kainonly@qq.com'
    });
  });
});
