import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { BitHeaderTagsDirective } from './bit-header-tags.directive';
import { BitHeaderBannerDirective } from './bit-header-banner.directive';
import { BitHeaderActionDirective } from './bit-header-action.directive';
import { BitHeaderFooterDirective } from './bit-header-footer.directive';
import { BitRouterService } from '../bit-router.service';

@Component({
  selector: 'bit-header',
  template: `
    <ng-template #ContentTpl>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class BitHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() subTitle: any;
  @Input() back = false;
  @ViewChild('ContentTpl') content?: TemplateRef<any>;
  @ContentChild(BitHeaderBannerDirective) banner?: BitHeaderBannerDirective;
  @ContentChild(BitHeaderTagsDirective) tags?: BitHeaderTagsDirective;
  @ContentChildren(BitHeaderActionDirective) actions?: QueryList<BitHeaderActionDirective>;
  @ContentChild(BitHeaderFooterDirective) footer?: BitHeaderFooterDirective;

  constructor(private router: BitRouterService) {}

  ngOnInit(): void {
    this.router.subTitle = this.subTitle;
    this.router.back = this.back !== undefined;
  }

  ngAfterViewInit(): void {
    this.router.banner = this.banner?.ref;
    this.router.actions = this.actions?.map(v => v.ref);
    this.router.tags = this.tags?.ref;
    this.router.content = this.content;
    this.router.footer = this.footer?.ref;
    this.router.changed.next(true);
  }

  ngOnDestroy(): void {
    this.router.subTitle = null;
    this.router.back = false;
    this.router.banner = undefined;
    this.router.actions = [];
    this.router.tags = undefined;
    this.router.content = undefined;
    this.router.footer = undefined;
  }
}
