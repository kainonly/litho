import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
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
export class WpxLayoutComponent implements AfterContentInit {
  @Input() wpxNoPadding?: boolean;
  @Input() wpxTitle?: string;
  @Input() wpxSkip = false;
  @Input() wpxBack = false;
  @ContentChild(WpxLayoutAlertDirective, { read: TemplateRef }) wpxAlert?: TemplateRef<any>;
  @ContentChild(WpxLayoutContentDirective, { read: TemplateRef }) wpxContent?: TemplateRef<any>;
  @ContentChildren(WpxLayoutActionDirective, { read: TemplateRef }) wpxActions?: QueryList<TemplateRef<any>>;

  constructor(private wpx: WpxService) {}

  ngAfterContentInit(): void {
    this.wpx.layout.next({
      noPadding: this.wpxNoPadding,
      skipPageHeader: this.wpxSkip,
      showBack: this.wpxBack,
      title: this.wpxTitle,
      alert: this.wpxAlert,
      content: this.wpxContent,
      actions: this.wpxActions
    });
  }
}
