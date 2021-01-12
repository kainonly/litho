/* tslint:disable:component-class-suffix */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BitConfigService, BitService, NgxBitModule } from 'ngx-bit';
import { BitExtModule, BitI18nTooltipComponent } from 'ngx-bit/component';
import { environment } from '../../simulation/environment';

describe('BitI18nTooltipComponent', () => {
  let config: BitConfigService;
  let bit: BitService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach((done) => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [
          TestComponent
        ],
        imports: [
          BitExtModule,
          RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      config = TestBed.inject(BitConfigService);
      bit = TestBed.inject(BitService);
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      config.setupLocales(import('../../simulation/common.language'));
      setTimeout(() => {
        bit.registerLocales(import('../../simulation/language'));
        setTimeout(() => {
          done();
        }, 200);
      }, 200);
    }
  });

  it('Test the internationalization prompt detection component', () => {
    bit.setLocale('zh_cn');
    bit.i18nTooltip = {
      name: ['zh_cn', 'en_us']
    };
    fixture.detectChanges();
    expect(component.ref.nativeElement.innerText).toBe('请输入中文 , 请输入英文');
    bit.i18nTooltip = {
      name: ['en_us']
    };
    fixture.detectChanges();
    expect(component.ref.nativeElement.innerText).toBe('请输入英文');
    bit.i18nTooltip = {
      name: []
    };
    fixture.detectChanges();
    expect(component.ref.nativeElement.innerText).toBe('无提示');
    bit.setLocale('en_us');
    bit.i18nTooltip = {
      name: ['zh_cn', 'en_us']
    };
    fixture.detectChanges();
    expect(component.ref.nativeElement.innerText).toBe('Please enter Chinese , Please enter English');
  });
});

@Component({
  template: `
    <div #element>
      <ng-container *ngTemplateOutlet="tooltip.ref"></ng-container>
    </div>
    <bit-i18n-tooltip #tooltip groupName="name"></bit-i18n-tooltip>
  `
})
class TestComponent {
  @ViewChild('element') ref: ElementRef;
}
