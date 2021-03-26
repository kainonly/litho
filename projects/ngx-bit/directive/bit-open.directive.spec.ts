/* tslint:disable:component-class-suffix */
import { Component, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BitConfigService, BitEventsService, BitHttpService, BitService, BitSupportService, BitSwalService } from 'ngx-bit';
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
              path: 'admin-index',
              loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
            }
          ])
        ],
        providers: [
          BitService,
          BitHttpService,
          BitEventsService,
          BitSupportService,
          BitSwalService,
          {
            provide: BitConfigService, useFactory: () => {
              const env = environment.bit;
              const service = new BitConfigService();
              Reflect.ownKeys(env).forEach(key => {
                service[key] = env[key];
              });
              return service;
            }
          }
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

  it('Test open routerlink', (done) => {
    zone.run(() => {
      const event = router.events.subscribe(events => {
        if (events instanceof NavigationEnd) {
          expect(events.url).toBe('/admin-index');
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
