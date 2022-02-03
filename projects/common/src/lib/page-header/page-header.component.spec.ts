import { Component, ViewChild } from '@angular/core';
import { WpxModule, WpxPageHeaderComponent, WpxService, WpxShareModule } from '@weplanx/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NzBreadCrumbComponent } from 'ng-zorro-antd/breadcrumb';

@Component({
  template: `
    <wpx-page-header [wpxManual]="true"></wpx-page-header>
    <router-outlet></router-outlet>
  `
})
class AppComponent {
  @ViewChild(WpxPageHeaderComponent) pageHeader!: WpxPageHeaderComponent;
}

@Component({
  template: ` <wpx-layout [wpxSkip]="true"></wpx-layout> `
})
class HomeComponent {}

@Component({
  template: `
    <wpx-layout wpxTitle="测试页">
      <ng-container *wpxLayoutAlert>提示投射</ng-container>
      <ng-container *wpxLayoutAction>操作一</ng-container>
      <ng-container *wpxLayoutAction>操作二</ng-container>
      <ng-container *wpxLayoutContent>内容投射</ng-container>
    </wpx-layout>
  `
})
class ExampleComponent {}

describe('测试 WpxPageHeaderComponent', () => {
  let wpx: WpxService;
  let app: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HomeComponent, ExampleComponent],
      imports: [
        WpxModule,
        WpxShareModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: HomeComponent,
            data: {
              breadcrumb: '主页'
            }
          },
          {
            path: 'example',
            component: ExampleComponent,
            data: {
              breadcrumb: '测试页'
            }
          }
        ])
      ]
    });

    wpx = TestBed.inject(WpxService);
    app = TestBed.createComponent(AppComponent);
    app.autoDetectChanges();
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('检测忽略页头', fakeAsync(() => {
    router.navigate(['']);
    TestBed.createComponent(HomeComponent).autoDetectChanges();
    tick();
    expect(app.debugElement.query(By.directive(WpxPageHeaderComponent)).nativeElement.innerText).toBe('');
  }));

  it('检测自定义页头', fakeAsync(() => {
    router.navigate(['example']);
    TestBed.createComponent(ExampleComponent).autoDetectChanges();
    tick();
    expect(app.debugElement.query(By.css('.wpx-layout-alert')).nativeElement.innerText).toEqual('提示投射');
    const breadcrumb = app.debugElement.query(By.css('.ant-breadcrumb')).componentInstance as NzBreadCrumbComponent;
    expect(breadcrumb.nzAutoGenerate).toBeTruthy();
    expect(breadcrumb.breadcrumbs).toEqual([
      {
        label: '测试页',
        params: {},
        url: '/example'
      }
    ]);
    const actions = app.debugElement.queryAll(By.css('.ant-page-header-heading-extra .ant-space-item'));
    expect(actions.map(v => v.nativeElement.innerText)).toEqual(['操作一', '操作二']);
    expect(app.debugElement.query(By.css('.ant-page-header-content')).nativeElement.innerText).toEqual('内容投射');
  }));
});
