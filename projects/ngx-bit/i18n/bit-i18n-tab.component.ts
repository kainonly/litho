import { Component, ContentChildren, QueryList } from '@angular/core';

import { BitI18nItemDirective } from './bit-i18n-item.directive';

@Component({
  selector: 'bit-i18n-tab',
  template: `
    <nz-tabset nzSize="small">
      <ng-container *ngFor="let item of items">
        <nz-tab [nzTitle]="item.bitI18nItem.name">
          <ng-container *ngTemplateOutlet="item.ref"></ng-container>
        </nz-tab>
      </ng-container>
    </nz-tabset>
  `
})
export class BitI18nTabComponent {
  @ContentChildren(BitI18nItemDirective) items!: QueryList<BitI18nItemDirective>;
}
