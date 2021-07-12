import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { BitModule, BitService } from 'ngx-bit';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BitBackDirective, BitDirectiveModule } from 'ngx-bit/directive';
import { environment } from '@mock/env';
import { HttpClientModule } from '@angular/common/http';
import { routes } from '@mock/routes';
import { filter, take } from 'rxjs/operators';
import { ExampleModule } from '@mock/example.module';

describe('BitBackDirective', () => {
  let router: Router;
  let bit: BitService;
  let location: Location;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        HttpClientModule,
        NzButtonModule,
        BitDirectiveModule,
        RouterModule.forRoot(routes),
        BitModule.forRoot(environment.bit),
        ExampleModule
      ]
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    bit = TestBed.inject(BitService);
    fixture = TestBed.createComponent(TestComponent);
    router.navigate(['/']);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Test click trigger to route back', done => {
    let count = 2;
    router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        take(count)
      )
      .subscribe((e: any) => {
        switch (2 - count) {
          case 0:
            expect(e.url).toBe('/example-index');
            bit.open(['example-add']);
            break;
          case 1:
            expect(e.url).toBe('/example-add');
            const button = fixture.debugElement.query(By.directive(BitBackDirective));
            button.triggerEventHandler('click', null);
            break;
        }
        count--;
      });
    location.subscribe(e => {
      setTimeout(() => {
        expect(e.url).toBe('/example-index');
        done();
      }, 200);
    });
    bit.open(['example-index']);
  });
});

@Component({
  template: ` <button nz-button nzType="primary" bitBack>Test</button> `
})
class TestComponent {}
