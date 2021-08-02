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
import { BitPhAlertDirective, BitPhFooterDirective, BitPhTagsDirective, BitRouterService } from 'ngx-bit/router';

import { BitPhActionDirective } from './bit-ph-action.directive';

@Component({
  selector: 'bit-ph',
  template: `<ng-template><ng-content></ng-content></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitPhComponent implements OnInit, AfterContentInit, AfterViewInit {
  @Input() @InputBoolean() skip?: any;
  @Input() @InputBoolean() back?: any;
  @Input() subTitle?: string | Record<string, string>;

  @ContentChild(BitPhAlertDirective, { read: TemplateRef }) alert?: TemplateRef<any>;
  @ContentChild(BitPhTagsDirective, { read: TemplateRef }) tags?: TemplateRef<any>;
  @ContentChildren(BitPhActionDirective, { read: TemplateRef }) actions?: QueryList<TemplateRef<any>>;
  @ViewChild(TemplateRef) content?: TemplateRef<any>;
  @ContentChild(BitPhFooterDirective, { read: TemplateRef }) footer?: TemplateRef<any>;

  constructor(private router: BitRouterService) {}

  ngOnInit(): void {
    this.router.skip.next(!!this.skip);
    this.router.back.next(!!this.back);
    this.router.subTitle.next(this.subTitle || null);
  }

  ngAfterContentInit() {
    this.router.alert.next(this.alert || null);
    this.router.tags.next(this.tags || null);
    this.router.actions.next(this.actions || null);
    this.router.footer.next(this.footer || null);
  }

  ngAfterViewInit() {
    this.router.content.next(this.content || null);
  }
}
