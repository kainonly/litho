import { Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitModule, BitService } from 'ngx-bit';
import { BitComponentModule } from 'ngx-bit/component';
import { environment } from '@mock/env';
import { BitRouterModule, BitRouterService } from 'ngx-bit/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { resourceData } from '@mock/dataset';
import { By } from '@angular/platform-browser';
import { NzMenuItemDirective } from 'ng-zorro-antd/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BitSiderComponent', () => {
  let bit: BitService;
  let router: BitRouterService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        HttpClientModule,
        BitComponentModule,
        BitRouterModule,
        RouterModule.forRoot([]),
        BitModule.forRoot(environment.bit),
        NoopAnimationsModule
      ]
    });
    bit = TestBed.inject(BitService);
    router = TestBed.inject(BitRouterService);
    fixture = TestBed.createComponent(TestComponent);
    bit.setupLocale();
    bit.registerLocales(import('@mock/common.language'));
    bit.setLocale('zh_cn');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Test sider', () => {
    router.navActive = ['system'];
    fixture.detectChanges();
    const debugEl = fixture.debugElement;
    const subActive = debugEl.query(By.css('.ant-menu-submenu-active'));
    expect(subActive.query(By.css('span[title] i')).classes.hasOwnProperty('anticon-setting')).toBeTruthy();
    expect(subActive.query(By.css('span[title] span')).nativeElement.innerHTML).toBe('系统设置');
    const menuItems = debugEl.queryAll(By.directive(NzMenuItemDirective)).map(v => ({
      key: v.attributes['ng-reflect-bit-open'],
      text: v.query(By.css('.nav-text')).nativeElement.innerHTML
    }));
    const check: Record<string, any> = {};
    for (const x of resourceData) {
      const data = JSON.parse(x.name);
      check[x.key] = data['zh_cn'];
    }
    menuItems.forEach(value => {
      expect(value.text).toBe(check[value.key!]);
    });
  });
});

@Component({
  selector: 'test',
  template: ` <bit-sider [collapsed]="collapsed" [data]="nav"></bit-sider> `
})
class TestComponent implements OnInit {
  collapsed = true;
  nav!: any[];

  ngOnInit(): void {
    const resource: Record<string, any> = {};
    const nav: any = [];
    for (const x of resourceData) {
      resource[x.key] = x;
    }
    for (const x of resourceData) {
      if (!x.nav) {
        continue;
      }
      if (x.parent === 'origin') {
        nav.push(x);
      } else {
        const parent = x.parent;
        if (resource.hasOwnProperty(parent)) {
          const rows = resource[parent];
          if (!rows.hasOwnProperty('children')) {
            rows.children = [];
          }
          Reflect.set(x, 'parentNode', rows);
          rows.children.push(x);
        }
      }
    }
    this.nav = nav;
  }
}
