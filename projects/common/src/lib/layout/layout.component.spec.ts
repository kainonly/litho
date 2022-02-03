import { Component, DebugElement } from '@angular/core';
import { WpxModule, WpxService, WpxShareModule } from '@weplanx/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: ` <wpx-layout wpxTitle="测试标题" [wpxBack]="true" [wpxNoPadding]="true"></wpx-layout>`
})
class ExampleComponent {}

describe('测试 WpxLayoutComponent', () => {
  let wpx: WpxService;
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [ExampleComponent],
        imports: [WpxModule, WpxShareModule]
      });
      wpx = TestBed.inject(WpxService);
      fixture = TestBed.createComponent(ExampleComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    }
  });

  it('检测参数正确性', done => {
    wpx.layout.subscribe(v => {
      expect(v.title).toEqual('测试标题');
      expect(v.showBack).toBeTruthy();
      expect(v.noPadding).toBeTruthy();
      expect(v.skipPageHeader).toBeFalsy();
      done();
    });
  });
});
