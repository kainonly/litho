/* tslint:disable:component-class-suffix */
import { Location } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { BitConfigService, BitEventsService, BitHttpService, BitService, BitSupportService, BitSwalService } from 'ngx-bit';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BitBackDirective, BitDirectiveModule } from 'ngx-bit/directive';
import { environment } from '../simulation/environment';

describe('BitBackDirective', () => {
  let bit: BitService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let zone: NgZone;
  let router: Router;
  let location: Location;

  beforeEach(() => {
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
          },
          {
            path: 'admin-add',
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
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Test click trigger to route back', (done) => {
    zone.run(() => {
      bit.open(['admin-index']);
      setTimeout(() => {
        bit.open(['admin-add']);
        setTimeout(() => {
          const button = fixture.debugElement.query(By.directive(BitBackDirective));
          button.triggerEventHandler('click', null);
          location.subscribe(value => {
            expect(value.url).toBe('/admin-index');
            done();
          });
        }, 200);
      }, 200);
    });
  });
});

@Component({
  template: `
    <button nz-button nzType="primary" bitBack>Test</button>
  `
})
class TestComponent {
}
