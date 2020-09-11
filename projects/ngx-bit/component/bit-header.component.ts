import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BitSupportService } from 'ngx-bit';

@Component({
  selector: 'bit-header',
  template: `
    <ng-template #actions>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class BitHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() subTitle: any;
  @Input() back: boolean;
  @ViewChild('actions') actions: TemplateRef<any>;

  constructor(
    private support: BitSupportService
  ) {
  }

  ngOnInit() {
    this.support.subTitle = this.subTitle;
    this.support.back = this.back !== undefined;
  }

  ngAfterViewInit() {
    this.support.actions = this.actions;
    this.support.status.emit('update');
  }

  ngOnDestroy() {
    this.support.actions = undefined;
    this.support.back = false;
    this.support.subTitle = undefined;
  }
}
