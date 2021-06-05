/* tslint:disable:component-class-suffix */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BitModule, BitService } from 'ngx-bit';
import { BitDirectiveModule, BitOpenDirective } from 'ngx-bit/directive';
import { environment } from '@mock/env';
import { HttpClientModule } from '@angular/common/http';
import { routes } from '@mock/routes';
import { filter, take } from 'rxjs/operators';

describe('BitOpenDirective', () => {
  let router: Router;
  let bit: BitService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;


  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [
          TestComponent
        ],
        imports: [
          HttpClientModule,
          BitDirectiveModule,
          NzButtonModule,
          BitModule.forRoot(environment.bit),
          RouterModule.forRoot(routes)
        ]
      });
      router = TestBed.inject(Router);
      bit = TestBed.inject(BitService);
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  });

  it('Test open routerlink', (done) => {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      take(1)
    ).subscribe((e: RouterEvent) => {
      expect(e.url).toBe('/example-add');
      done();
    });
    const button = fixture.debugElement.query(By.directive(BitOpenDirective));
    button.triggerEventHandler('click', null);
  });
});

@Component({
  template: `
    <button nz-button nzType="primary" [bitOpen]="['example-add']">Test</button>
  `
})
class TestComponent {
}
