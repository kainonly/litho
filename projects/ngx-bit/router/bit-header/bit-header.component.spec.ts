import { Component, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitModule } from 'ngx-bit';
import { BitComponentModule } from 'ngx-bit/component';
import { environment } from '../../simulation/environment';
import { BitHeaderActionDirective, BitHeaderComponent, BitRouterModule, BitRouterService } from 'ngx-bit/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('BitHeaderComponent', () => {
  let router: BitRouterService;
  let component: BitHeaderComponent;
  let fixture: ComponentFixture<BitHeaderComponent>;
  let test: ComponentFixture<TestComponent>;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          BitComponentModule,
          BitRouterModule,
          BitModule.forRoot(environment.bit),
          RouterModule.forRoot([])
        ]
      });
      router = TestBed.inject(BitRouterService);
      fixture = TestBed.createComponent(BitHeaderComponent);
      component = fixture.componentInstance;
      test = TestBed.createComponent(TestComponent);
    }
  });

  it('Test', (done) => {
    expect(router.subTitle).toBeUndefined();
    expect(router.back).toBeFalsy();
    expect(router.actions).toBeUndefined();
    router.changed.subscribe(() => {
      expect(router.subTitle).toEqual('this is subTitle');
      expect(router.back).toBeTruthy();
      expect(router.actions).toBeDefined();
      expect(router.actions).toBeInstanceOf(TemplateRef);
      fixture.destroy();
      expect(router.subTitle).toBeUndefined();
      expect(router.back).toBeFalsy();
      expect(router.actions).toBeUndefined();
      done();
    });
    component.back = true;
    component.subTitle = 'this is subTitle';
    component.actions = test.componentInstance.actions;
    fixture.detectChanges();
  });
});

@Component({
  template: `
    <span *bitHeaderAction>A</span>
  `
})
class TestComponent {
  @ViewChildren(BitHeaderActionDirective) actions: QueryList<BitHeaderActionDirective>;
}
