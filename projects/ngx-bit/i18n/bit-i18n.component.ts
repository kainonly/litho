import { Component, ContentChildren, QueryList } from '@angular/core';

import { BitConfig, BitService, Language } from 'ngx-bit';

import { BitI18nItemDirective } from './bit-i18n-item.directive';

@Component({
  selector: 'bit-i18n',
  exportAs: 'bitI18n',
  template: `
    <nz-tabset nzSize="small">
      <ng-container *ngFor="let item of items">
        <ng-template #title>
          <ng-container *ngIf="isSingle; else multi">
            {{ item.bitI18nItem.name }}
          </ng-container>
          <ng-template #multi>
            {{ item.bitI18nItem.name | object: bit.locale }}
          </ng-template>
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

  constructor(public bit: BitService, private config: BitConfig) {}

  /**
   * 单语言
   */
  get isSingle(): boolean {
    return !this.config.locale;
  }

  /**
   * 获取国际化语言种类
   */
  get languages(): Language[] {
    return this.config.i18n!.languages;
  }
}
