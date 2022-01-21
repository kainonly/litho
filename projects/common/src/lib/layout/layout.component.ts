import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef
} from '@angular/core';

import { InputBoolean } from 'ng-zorro-antd/core/util';

import { WpxService } from '../wpx.service';
import { WpxLayoutActionDirective } from './layout-action.directive';
import { WpxLayoutAlertDirective } from './layout-alert.directive';
import { WpxLayoutContentDirective } from './layout-content.directive';

@Component({
  selector: 'wpx-layout',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxLayoutComponent implements OnInit, AfterContentInit {
  @Input() wpxTitle?: string;
  @Input() @InputBoolean() wpxSkip = false;
  @Input() @InputBoolean() wpxBack = false;
  @ContentChild(WpxLayoutAlertDirective, { read: TemplateRef }) wpxAlert?: TemplateRef<any>;
  @ContentChild(WpxLayoutContentDirective, { read: TemplateRef }) wpxContent?: TemplateRef<any>;
  @ContentChildren(WpxLayoutActionDirective, { read: TemplateRef }) wpxActions?: QueryList<TemplateRef<any>>;

  constructor(private wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.layout.skipPageHeader = this.wpxSkip;
    this.wpx.layout.showBack = this.wpxBack;
    this.wpx.layout.title = this.wpxTitle;
  }

  ngAfterContentInit(): void {
    this.wpx.layout.alert = this.wpxAlert;
    this.wpx.layout.content = this.wpxContent;
    this.wpx.layout.actions = this.wpxActions;
  }
}
