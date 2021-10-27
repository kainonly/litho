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

import { WpxLayoutActionDirective } from './wpx-layout-action.directive';
import { WpxLayoutAlertDirective } from './wpx-layout-alert.directive';
import { WpxLayoutService } from './wpx-layout.service';

@Component({
  selector: 'wpx-layout',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxLayoutComponent implements OnInit, AfterContentInit {
  @Input() @InputBoolean() skip?: any;
  @Input() @InputBoolean() back?: any;
  @Input() title?: string;

  @ContentChild(WpxLayoutAlertDirective, { read: TemplateRef }) alert?: TemplateRef<any>;
  @ContentChildren(WpxLayoutActionDirective, { read: TemplateRef }) actions?: QueryList<TemplateRef<any>>;

  constructor(private wpxLayout: WpxLayoutService) {}

  ngOnInit(): void {
    this.wpxLayout.skip = !!this.skip;
    this.wpxLayout.back = !!this.back;
    this.wpxLayout.title = this.title;
  }

  ngAfterContentInit() {
    this.wpxLayout.alert = this.alert;
    this.wpxLayout.actions = this.actions;
  }
}
