/* tslint:disable:component-class-suffix */
import { Component, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BitService, NgxBitModule } from 'ngx-bit';
import { BitDirectiveModule, BitOpenDirective } from 'ngx-bit/directive';
import { environment } from '../simulation/environment';

describe('BitOpenDirective', () => {
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
            }
          ]),
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

  it('Test', (done) => {
    zone.run(() => {
      const event = router.events.subscribe(events => {
        if (events instanceof NavigationEnd) {
          expect(events.url).toBe('/%7Badmin-index%7D');
          event.unsubscribe();
          done();
        }
      });
      const button = fixture.debugElement.query(By.directive(BitOpenDirective));
      button.triggerEventHandler('click', null);
    });
  });

});

@Component({
  template: `
    <button nz-button nzType="primary" [bitOpen]="['admin-index']">Test</button>
  `
})
class TestComponent {
}
