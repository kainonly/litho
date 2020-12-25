/* tslint:disable:component-class-suffix */
import { Component, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BitService, NgxBitModule } from 'ngx-bit';
import { BitCrossLevelDirective, BitDirectiveModule } from 'ngx-bit/directive';
import { AsyncSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../simulation/environment';

describe('BitCrossLevelDirective', () => {
  let bit: BitService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let zone: NgZone;
  let router: Router;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [
          TestComponent
        ],
        imports: [
          BitDirectiveModule,
          NzButtonModule,
          RouterModule.forRoot([
    {
        path: '',
        loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
    },
    {
        path: '{admin-index}',
        loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
    },
    {
        path: '{admin-edit}/:id',
        loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
    },
    {
        path: '{admin-edit}/:id/:subId',
        loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
    }
], { relativeLinkResolution: 'legacy' }),
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      bit = TestBed.inject(BitService);
      zone = TestBed.inject(NgZone);
      router = TestBed.inject(Router);
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  });

  it('Test cross-level jump directive', (done) => {
    const complete: AsyncSubject<any> = new AsyncSubject<any>();
    zone.run(() => {
      bit.open(['admin-index']);
      setTimeout(() => {
        const event = complete.pipe(
          switchMap(status => {
            if (status) {
              return router.events;
            }
          })
        ).subscribe(events => {
          if (events instanceof NavigationEnd) {
            expect(events.url).toBe('/%7Badmin-edit%7D/2');
            event.unsubscribe();
            complete.unsubscribe();
            done();
          }
        });
        bit.open(['admin-edit', 2]);
        setTimeout(() => {
          bit.open(['admin-edit', 2, 'a7']);
          setTimeout(() => {
            complete.next(true);
            complete.complete();
            const button = fixture.debugElement.query(By.directive(BitCrossLevelDirective));
            button.triggerEventHandler('click', null);
          }, 200);
        }, 200);
      }, 200);
    });

  });
});

@Component({
  template: `
    <button nz-button nzType="primary" bitCrossLevel="admin-edit">Test</button>
  `
})
class TestComponent {
}
