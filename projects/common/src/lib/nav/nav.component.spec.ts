import { Component, ViewChild } from '@angular/core';
import { WpxModule, WpxNavComponent, WpxService, WpxShareModule } from '@weplanx/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenStatePipe } from './open-state.pipe';
import { nav } from '../mock';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconService } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NzMenuItemDirective, NzSubMenuComponent } from 'ng-zorro-antd/menu';

@Component({
  template: ` <wpx-nav wpxTheme="dark"></wpx-nav> `
})
class ExampleComponent {
  @ViewChild(WpxNavComponent) nav!: WpxNavComponent;
}

describe('测试导航', () => {
  let wpx: WpxService;
  let fixture: ComponentFixture<ExampleComponent>;
  let component: ExampleComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      imports: [WpxModule, WpxShareModule, HttpClientModule, NoopAnimationsModule, RouterModule.forRoot([])]
    });
    TestBed.inject(NzIconService).changeAssetsSource('https://cdn.kainonly.com/');
    wpx = TestBed.inject(WpxService);
    wpx.setNavs(nav);
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('检测 WpxNavComponent 参数正确性', () => {
    const pipe = new OpenStatePipe(wpx);
    expect(pipe.transform('61ca6ada2e83bf89116a479e')).toBeFalsy();
    expect(pipe.transform('61ca6ada2e83bf89116a479e', '61ca6ada2e83bf89116a479e')).toBeTruthy();
    expect(component.nav.wpxTheme).toEqual('dark');
    expect(
      fixture.debugElement
        .queryAll(By.directive(NzSubMenuComponent))
        .map(v => v.query(By.css('span[title]')).nativeElement.innerText)
    ).toEqual(['商品管理', '订单管理']);
    expect(
      fixture.debugElement.queryAll(By.directive(NzMenuItemDirective)).map(v => v.nativeElement.innerText)
    ).toEqual(['商品分组', '商品清单', '商品设置', '订单列表', '售后维权']);
  });
});
