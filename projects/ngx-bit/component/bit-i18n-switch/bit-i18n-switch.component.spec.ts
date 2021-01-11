import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BitService, NgxBitModule } from 'ngx-bit';
import { BitI18nSwitchComponent, BitExtModule } from 'ngx-bit/component';
import { environment } from '../simulation/environment';
import { By } from '@angular/platform-browser';

describe('BitI18nSwitchComponent', () => {
  let bit: BitService;
  let component: BitI18nSwitchComponent;
  let fixture: ComponentFixture<BitI18nSwitchComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        imports: [
          BitExtModule,
          RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      bit = TestBed.inject(BitService);
      fixture = TestBed.createComponent(BitI18nSwitchComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
    }
  });

  it('Test form internationalization switch component', () => {
    fixture.detectChanges();
    const group = debugElement.queryAll(By.css('.ant-radio-button-input'));
    const radioZHCN: HTMLInputElement = group[0].nativeElement;
    const radioEnUS: HTMLInputElement = group[1].nativeElement;
    expect(bit.i18n).toBe('zh_cn');
    radioEnUS.click();
    expect(bit.i18n).toBe('en_us');
    radioZHCN.click();
    expect(bit.i18n).toBe('zh_cn');
  });

});
