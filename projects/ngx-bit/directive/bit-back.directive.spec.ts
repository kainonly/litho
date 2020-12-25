/* tslint:disable:component-class-suffix */
import { Location } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BitService, NgxBitModule } from 'ngx-bit';
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
        path: '{admin-index}',
        loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
    },
    {
        path: '{admin-add}',
        loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
    }
], { relativeLinkResolution: 'legacy' }),
        NgxBitModule.forRoot(environment.bit)
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

  it('Test click trigger to location back', (done) => {
    zone.run(() => {
      bit.open(['admin-index']);
      setTimeout(() => {
        bit.open(['admin-add']);
        setTimeout(() => {
          const button = fixture.debugElement.query(By.directive(BitBackDirective));
          button.triggerEventHandler('click', null);
          location.subscribe(value => {
            expect(value.url).toBe('/%7Badmin-index%7D');
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
