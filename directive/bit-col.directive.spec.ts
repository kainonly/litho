/* tslint:disable:component-class-suffix */
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BitConfigService, NgxBitModule } from 'ngx-bit';
import { BitColDirective, BitDirectiveModule } from 'ngx-bit/directive';
import { environment } from '../simulation/environment';
import { NzColDirective, NzGridModule } from 'ng-zorro-antd/grid';

describe('BitColDirective', () => {
  let config: BitConfigService;
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
          NzGridModule,
          BitDirectiveModule,
          RouterModule.forRoot([]),
          NgxBitModule.forRoot(environment.bit)
        ],
        providers: [
          NzColDirective
        ]
      });
      config = TestBed.inject(BitConfigService);
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    }
  });

  it('Test grid group identification directive', () => {
    const all: DebugElement[] = debugElement.queryAll(By.directive(BitColDirective));
    for (const debug of all) {
      const map = new Map([
        ['nzSm', 'sm'],
        ['nzMd', 'md'],
        ['nzLg', 'lg'],
        ['nzXl', 'xl'],
        ['nzXXl', 'xxl']
      ]);
      const ID = debug.nativeElement.getAttribute('bitcol');
      const classLists = debug.nativeElement.classList;
      expect(classLists.contains('ant-col')).toBeTruthy();
      if (config.col.hasOwnProperty(ID)) {
        const option = config.col[ID];
        for (const [key, value] of map) {
          if (option.hasOwnProperty(key)) {
            expectClass(classLists, value, option[key]);
          }
        }
      }
    }
  });

  function expectClass(classLists: DOMTokenList, col: string, value: any) {
    if (typeof value === 'string') {
      expect(classLists.contains(`ant-col-${col}-${value}`)).toBeTruthy();
    }
    if (typeof value === 'object') {
      if (value.hasOwnProperty('span')) {
        expect(classLists.contains(`ant-col-${col}-${value.span}`)).toBeTruthy();
      }
      if (value.hasOwnProperty('offset')) {
        expect(classLists.contains(`ant-col-${col}-offset-${value.offset}`)).toBeTruthy();
      }
      if (value.hasOwnProperty('pull')) {
        expect(classLists.contains(`ant-col-${col}-pull-${value.pull}`)).toBeTruthy();
      }
      if (value.hasOwnProperty('order')) {
        expect(classLists.contains(`ant-col-${col}-order-${value.order}`)).toBeTruthy();
      }
    }
  }
});

@Component({
  template: `
    <div nz-row>
      <div nz-col bitCol="label"></div>
      <div nz-col bitCol="control"></div>
      <div nz-col bitCol="submit"></div>
      <div nz-col bitCol="somebody"></div>
      <div nz-col bitCol="test"></div>
    </div>
  `
})
class TestComponent {
}
