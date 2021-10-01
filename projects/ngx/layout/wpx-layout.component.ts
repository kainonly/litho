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
  @Input() title?: string;
  @Input() subTitle?: string;

  @ContentChild(WpxLayoutAlertDirective, { read: TemplateRef }) alert?: TemplateRef<any>;
  @ContentChild(WpxLayoutTagsDirective, { read: TemplateRef }) tags?: TemplateRef<any>;
  @ContentChildren(WpxLayoutActionDirective, { read: TemplateRef }) actions?: QueryList<TemplateRef<any>>;
  @ViewChild(TemplateRef) content?: TemplateRef<any>;
  @ContentChild(WpxLayoutFooterDirective, { read: TemplateRef }) footer?: TemplateRef<any>;

  constructor(private wpxLayout: WpxLayoutService) {}

  ngOnInit(): void {
    this.wpxLayout.skip = !!this.skip;
    this.wpxLayout.back = !!this.back;
    this.wpxLayout.title = this.title;
    this.wpxLayout.subTitle = this.subTitle;
  }

  ngAfterContentInit() {
    this.wpxLayout.alert = this.alert;
    this.wpxLayout.tags = this.alert;
    this.wpxLayout.actions = this.actions;
    this.wpxLayout.footer = this.footer;
  }

  ngAfterViewInit() {
    this.wpxLayout.content = this.content;
  }
}
