import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { FormGroupName } from '@angular/forms';

import { BitConfig, BitService, I18n, Language } from 'ngx-bit';

import { BitI18nTabDirective } from './bit-i18n-tab.directive';

@Component({
  selector: 'bit-i18n',
  exportAs: 'bitI18n',
  template: `
    <nz-tabset>
      <ng-container *ngFor="let tab of i18nTabs">
        <nz-tab [nzTitle]="tab.bitI18nTab.name | object: bit.locale">
          <ng-container *ngTemplateOutlet="tab.ref"></ng-container>
        </nz-tab>
      </ng-container>
    </nz-tabset>
  `
})
export class BitI18nComponent {
  @ContentChildren(BitI18nTabDirective) i18nTabs!: QueryList<BitI18nTabDirective>;

  constructor(public bit: BitService, private config: BitConfig) {}

  get languages(): Language[] {
    return this.config.i18n!.languages;
  }
}
