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
import { WpxLayoutActionDirective } from './wpx-layout-action.directive';
import { WpxLayoutAlertDirective } from './wpx-layout-alert.directive';

@Component({
  selector: 'wpx-layout',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxLayoutComponent implements OnInit, AfterContentInit {
  @Input() title?: string;
  @Input() @InputBoolean() skip?: any;
  @Input() @InputBoolean() back?: any;
  @ContentChild(WpxLayoutAlertDirective, { read: TemplateRef }) alert?: TemplateRef<any>;
  @ContentChildren(WpxLayoutActionDirective, { read: TemplateRef }) actions?: QueryList<TemplateRef<any>>;

  constructor(private wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.layout.skipPageHeader = !!this.skip;
    this.wpx.layout.showBack = !!this.back;
    this.wpx.layout.title = this.title;
  }

  ngAfterContentInit() {
    this.wpx.layout.alert = this.alert;
    this.wpx.layout.actions = this.actions;
  }
}
