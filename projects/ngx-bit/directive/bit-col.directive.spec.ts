import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BitConfig, BitModule } from 'ngx-bit';
import { BitGridDirective, BitDirectiveModule } from 'ngx-bit/directive';
import { environment } from '@mock/env';
import { NzGridModule } from 'ng-zorro-antd/grid';

describe('BitColDirective', () => {
  let config: BitOptions;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [NzGridModule, BitDirectiveModule, BitModule.forRoot(environment.bit)]
      });
      config = TestBed.inject(BitOptions);
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    }
  });

  it('Test grid group identification directive', () => {
    const all: DebugElement[] = debugElement.queryAll(By.directive(BitGridDirective));
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

  function expectClass(classLists: DOMTokenList, col: string, value: any): void {
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
class TestComponent {}
