/* tslint:disable:component-class-suffix */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BitModule, BitService } from 'ngx-bit';
import { BitHistoryDirective, BitDirectiveModule } from 'ngx-bit/directive';
import { filter, take } from 'rxjs/operators';
import { environment } from '@mock/env';
import { HttpClientModule } from '@angular/common/http';
import { routes } from '@mock/routes';

describe('BitCrossLevelDirective', () => {
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

  it('Test route history', (done) => {
    let count = 3;
    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      take(count)
    ).subscribe((e: RouterEvent) => {
      switch (3 - count) {
        case 0:
          expect(e.url).toBe('/example-edit/123');
          bit.open(['example-opt', '123', 'A1']);
          break;
        case 1:
          expect(e.url).toBe('/example-opt/123/A1');
          const button = fixture.debugElement.query(By.directive(BitHistoryDirective));
          button.triggerEventHandler('click', null);
          break;
        case 2:
          expect(e.url).toBe('/example-edit/123');
          break;
      }
      count--;
      if (!count) {
        done();
      }
    });
    bit.open(['example-edit', '123']);
  });
});

@Component({
  template: `
    <button nz-button nzType="primary" bitHistory="example-edit">Test</button>
  `
})
class TestComponent {
}
