import { Component, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitModule } from 'ngx-bit';
import { BitComponentModule } from 'ngx-bit/component';
import { environment } from '@mock/env';
import { BitHeaderComponent, BitRouterModule, BitRouterService } from 'ngx-bit/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('BitHeaderComponent', () => {
  let router: BitRouterService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        HttpClientModule,
        BitComponentModule,
        BitRouterModule,
        RouterModule.forRoot([]),
        BitModule.forRoot(environment.bit)
      ]
    });
    router = TestBed.inject(BitRouterService);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('Test router service changed', (done) => {
    expect(router.subTitle).toBeNull();
    expect(router.back).toBeFalsy();
    expect(router.content).toBeUndefined();
    expect(router.banner).toBeUndefined();
    expect(router.tags).toBeUndefined();
    expect(router.actions).toEqual([]);
    expect(router.footer).toBeUndefined();
    router.changed.subscribe(() => {
      console.log(router);
      expect(router.subTitle).toEqual('this is subTitle');
      expect(router.back).toBeTruthy();
      expect(router.content).toBeDefined();
      expect(router.content).toBeInstanceOf(TemplateRef);
      expect(router.banner).toBeDefined();
      expect(router.banner).toBeInstanceOf(TemplateRef);
      expect(router.tags).toBeDefined();
      expect(router.tags).toBeInstanceOf(TemplateRef);
      expect(router.actions).toBeDefined();
      router.actions.forEach(value => {
        expect(value).toBeInstanceOf(TemplateRef);
      });
      expect(router.footer).toBeDefined();
      expect(router.footer).toBeInstanceOf(TemplateRef);
      fixture.destroy();
      expect(router.subTitle).toBeNull();
      expect(router.back).toBeFalsy();
      expect(router.content).toBeUndefined();
      expect(router.banner).toBeUndefined();
      expect(router.tags).toBeUndefined();
      expect(router.actions).toEqual([]);
      expect(router.footer).toBeUndefined();
      done();
    });
    fixture.detectChanges();
  });
});

@Component({
  selector: 'test',
  template: `
    <bit-header [back]="true" subTitle="this is subTitle">
      <span *bitHeaderBanner>Banner</span>
      <span *bitHeaderTags>Tags</span>
      <span *bitHeaderAction>A</span>
      <span *bitHeaderAction>B</span>
      Hello
      <span *bitHeaderFooter>footer</span>
    </bit-header>
  `
})
class TestComponent {
}
