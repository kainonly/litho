import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BitSupportService } from 'ngx-bit';

@Component({
  selector: 'bit-header',
  template: `
    <ng-template #banner>
      <ng-content select="nz-alert[bitBanner]"></ng-content>
    </ng-template>
    <ng-template #actions>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class BitHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() subTitle: any;
  @Input() back: boolean;
  @ViewChild('banner') banner: TemplateRef<any>;
  @ViewChild('actions') actions: TemplateRef<any>;

  constructor(
    private support: BitSupportService
  ) {
  }

  ngOnInit(): void {
    this.support.subTitle = this.subTitle;
    this.support.back = this.back !== undefined;
  }

  ngAfterViewInit(): void {
    this.support.banner = this.banner;
    this.support.actions = this.actions;
    this.support.status.emit('update');
  }

  ngOnDestroy(): void {
    this.support.banner = undefined;
    this.support.actions = undefined;
    this.support.back = false;
    this.support.subTitle = undefined;
  }
}
