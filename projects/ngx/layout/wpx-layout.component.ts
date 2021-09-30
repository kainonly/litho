import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { InputBoolean } from 'ng-zorro-antd/core/util';

import { WpxLayoutActionDirective } from './wpx-layout-action.directive';
import { WpxLayoutAlertDirective } from './wpx-layout-alert.directive';
import { WpxLayoutFooterDirective } from './wpx-layout-footer.directive';
import { WpxLayoutTagsDirective } from './wpx-layout-tags.directive';
import { WpxLayoutService } from './wpx-layout.service';

@Component({
  selector: 'wpx-layout',
  template: `<ng-template><ng-content></ng-content></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxLayoutComponent implements OnInit, AfterContentInit, AfterViewInit {
  @Input() @InputBoolean() skip?: any;
  @Input() @InputBoolean() back?: any;
  @Input() title?: string | Record<string, string>;
  @Input() subTitle?: string | Record<string, string>;

  @ContentChild(WpxLayoutAlertDirective, { read: TemplateRef }) alert?: TemplateRef<any>;
  @ContentChild(WpxLayoutTagsDirective, { read: TemplateRef }) tags?: TemplateRef<any>;
  @ContentChildren(WpxLayoutActionDirective, { read: TemplateRef }) actions?: QueryList<TemplateRef<any>>;
  @ViewChild(TemplateRef) content?: TemplateRef<any>;
  @ContentChild(WpxLayoutFooterDirective, { read: TemplateRef }) footer?: TemplateRef<any>;

  constructor(private wpxLayout: WpxLayoutService) {}

  ngOnInit(): void {
    this.wpxLayout.skip.next(!!this.skip);
    this.wpxLayout.back.next(!!this.back);
    this.wpxLayout.title.next(this.title || null);
    this.wpxLayout.subTitle.next(this.subTitle || null);
  }

  ngAfterContentInit() {
    this.wpxLayout.alert.next(this.alert || null);
    this.wpxLayout.tags.next(this.tags || null);
    this.wpxLayout.actions.next(this.actions || null);
    this.wpxLayout.footer.next(this.footer || null);
  }

  ngAfterViewInit() {
    this.wpxLayout.content.next(this.content || null);
  }
}
