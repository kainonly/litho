import { Component, ContentChildren, QueryList } from '@angular/core';

import { BitI18nItemDirective } from './bit-i18n-item.directive';

@Component({
  selector: 'bit-i18n',
  exportAs: 'bitI18n',
  template: `
    <nz-tabset nzSize="small">
      <ng-container *ngFor="let item of items">
        <ng-template #title>
          {{ item.bitI18nItem.name }}
        </ng-template>
        <nz-tab [nzTitle]="title">
          <ng-container *ngTemplateOutlet="item.ref"></ng-container>
        </nz-tab>
      </ng-container>
    </nz-tabset>
  `
})
export class BitI18nComponent {
  @ContentChildren(BitI18nItemDirective) items!: QueryList<BitI18nItemDirective>;
}
