import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitModule, Bit } from 'ngx-bit';
import { BitComponentModule } from 'ngx-bit/component';
import { environment } from '@mock/env';
import { BitRouterModule, BitRouterService } from 'ngx-bit/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { NzPageHeaderBreadcrumbDirective } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbItemComponent } from 'ng-zorro-antd/breadcrumb';

describe('BitPageHeaderComponent', () => {
  let bit: Bit;
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
        BitModule.forRoot(environment.bit),
        NoopAnimationsModule
      ]
    });
    bit = TestBed.inject(Bit);
    router = TestBed.inject(BitRouterService);
    fixture = TestBed.createComponent(TestComponent);
    bit.setupLocale();
    bit.registerLocales(import('@mock/common.language'));
    bit.setLocale('zh_cn');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Test sider', () => {
    router.title = {
      zh_cn: '你好'
    };
    router.subTitle = {
      zh_cn: '小标题'
    };
    router.breadcrumb = [
      {
        name: {
          zh_cn: '测试1'
        },
        key: 'test1',
        router: 0
      },
      {
        name: {
          zh_cn: '测试2'
        },
        key: 'test2',
        router: 0
      },
      {
        name: {
          zh_cn: '测试3'
        },
        key: 'test3',
        router: 0
      }
    ];
    router.banner = component.banner;
    router.content = component.content;
    router.tags = component.tags;
    router.actions = [component.action];
    router.footer = component.footer;
    fixture.detectChanges();
    const debugEl = fixture.debugElement;
    expect(debugEl.query(By.css('.ant-page-header-heading-title')).nativeElement.innerHTML).toBe('你好');
    expect(debugEl.query(By.css('.ant-page-header-heading-sub-title')).nativeElement.innerHTML).toBe('小标题');
    const items = debugEl.queryAll(By.directive(NzBreadCrumbItemComponent)).slice(1).map(v => {
      return v.query(By.css('.ant-breadcrumb-link')).nativeElement.innerText.trim();
    });
    expect(items[0]).toBe('测试1');
    expect(items[1]).toBe('测试2');
    expect(items[2]).toBe('测试3');
    expect(
      debugEl.query(By.css('.test-banner')).nativeElement.innerHTML
    ).toBe('Banner');
    expect(
      debugEl.query(By.css('.ant-page-header-content'))
        .query(By.css('span')).nativeElement.innerHTML
    ).toBe('Content');
    expect(
      debugEl.query(By.css('.ant-page-header-heading-tags'))
        .query(By.css('span')).nativeElement.innerHTML
    ).toBe('Tags');
    const actions = debugEl.query(By.css('.ant-page-header-heading-extra'))
      .queryAll(By.css('.ant-space-item'));
    expect(actions[0].query(By.css('span')).nativeElement.innerHTML).toBe('Action1');
    expect(
      debugEl.query(By.css('.ant-page-header-footer'))
        .query(By.css('span')).nativeElement.innerHTML
    ).toBe('Footer');
  });
});

@Component({
  selector: 'test',
  template: `
    <bit-page-header></bit-page-header>
    <ng-template #bannerTpl>
      <span class="test-banner">Banner</span>
    </ng-template>
    <ng-template #contentTpl>
      <span>Content</span>
    </ng-template>
    <ng-template #tagsTpl>
      <span>Tags</span>
    </ng-template>
    <ng-template #actionTpl>
      <span>Action1</span>
    </ng-template>
    <ng-template #footerTpl>
      <span>Footer</span>
    </ng-template>
  `
})
class TestComponent {
  @ViewChild('bannerTpl') banner: TemplateRef<any>;
  @ViewChild('contentTpl') content: TemplateRef<any>;
  @ViewChild('tagsTpl') tags: TemplateRef<any>;
  @ViewChild('actionTpl') action: TemplateRef<any>;
  @ViewChild('footerTpl') footer: TemplateRef<any>;
}
