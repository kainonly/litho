import { Component, ViewChild } from '@angular/core';
import { WpxHeaderComponent, WpxModule, WpxService, WpxShareModule } from '@weplanx/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { NzIconService } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: ` <wpx-header [wpxLogout]="logout"></wpx-header> `
})
class ExampleComponent {
  @ViewChild(WpxHeaderComponent) header!: WpxHeaderComponent;

  isLogout = false;

  logout = (): Observable<any> => {
    this.isLogout = true;
    return of(true);
  };
}

@Component({
  template: ` 登录页 `
})
class LoginComponent {}

describe('测试 WpxHeaderComponent', () => {
  let wpx: WpxService;
  let fixture: ComponentFixture<ExampleComponent>;
  let component: ExampleComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent, LoginComponent],
      imports: [
        WpxModule,
        WpxShareModule,
        HttpClientModule,
        NoopAnimationsModule,
        RouterModule.forRoot([
          {
            path: 'login',
            component: LoginComponent
          }
        ])
      ]
    });
    TestBed.inject(NzIconService).changeAssetsSource('https://cdn.kainonly.com/');
    wpx = TestBed.inject(WpxService);
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('检测参数正确性', () => {
    expect(component.isLogout).toBeFalsy();
    component.header.logout();
    expect(component.isLogout).toBeTruthy();
  });
});
