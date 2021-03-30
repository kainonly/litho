import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'bit-i18n-tooltip',
  template: `
    <ng-template #ref>
      <ng-container *ngIf="bit.i18nTooltip.hasOwnProperty(groupName) && bit.i18nTooltip[groupName].length !== 0;else not">
        <ng-container *ngFor="let ID of bit.i18nTooltip[groupName];first as isFirst">
          <ng-container *ngIf="!isFirst">,</ng-container>
          <ng-container *ngIf="bit.l.hasOwnProperty(groupName + '_' + ID);else universal">
            {{bit.l[groupName + '_' + ID]}}
          </ng-container>
          <ng-template #universal>
            <ng-container [ngSwitch]="ID">
              <ng-container *ngSwitchCase="'zh_cn'">
                {{bit.l['I18nZHCN']}}
              </ng-container>
              <ng-container *ngSwitchCase="'en_us'">
                {{bit.l['I18nENUS']}}
              </ng-container>
            </ng-container>
          </ng-template>
        </ng-container>
      </ng-container>
      <ng-template #not>
        {{bit.l['I18nNoTip']}}
      </ng-template>
    </ng-template>
  `
})
export class BitI18nTooltipComponent {
  @ViewChild('ref', { static: true }) ref: TemplateRef<any>;
  @Input() groupName: string;

  constructor(
    public bit: BitService
  ) {
  }
}
