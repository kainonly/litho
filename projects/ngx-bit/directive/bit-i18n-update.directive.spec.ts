/* tslint:disable:component-class-suffix */
import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BitService, NgxBitModule } from 'ngx-bit';
import { BitDirectiveModule, BitI18nUpdateDirective } from 'ngx-bit/directive';
import { environment } from '../simulation/environment';

describe('BitI18nUpdateDirective', () => {
  let bit: BitService;
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
          BitDirectiveModule,
          RouterModule.forRoot([]),
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      bit = TestBed.inject(BitService);
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    }
  });

  it('Test multilingual input box prompt', () => {
    expect(bit.i18nTooltip).toEqual({});
    const inputs = debugElement.queryAll(By.css('input'));
    inputs[0].nativeElement.value = '测试';
    inputs[0].triggerEventHandler('input', {
      target: inputs[0].nativeElement
    });
    expect(bit.i18nTooltip.hasOwnProperty('name')).toBeTruthy();
    expect(bit.i18nTooltip.name).toEqual(['en_us']);
    inputs[1].nativeElement.value = 'TEST';
    inputs[1].triggerEventHandler('input', {
      target: inputs[1].nativeElement
    });
    expect(bit.i18nTooltip.name).toEqual([]);
    inputs[0].nativeElement.value = '';
    inputs[0].triggerEventHandler('input', {
      target: inputs[0].nativeElement
    });
    expect(bit.i18nTooltip.name).toEqual(['zh_cn']);
  });
});

@Component({
  template: `
    <form [formGroup]="form">
      <div formGroupName="name" bitI18nUpdate>
        <input formControlName="zh_cn"/>
        <input formControlName="en_us"/>
      </div>
    </form>
  `
})
class TestComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public bit: BitService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.group(this.bit.i18nGroup({
        validate: {
          zh_cn: [Validators.required],
          en_us: [Validators.required]
        }
      }))
    });
  }
}
