import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {BitService} from '../common/bit.service';

@Component({
  selector: 'bit-i18n-tooltip',
  template: `
      <ng-template #ref>
          <ng-container *ngIf="bit.i18nTooltip.has(groupName) && bit.i18nTooltip.size !== 0;else not">
              <ng-container *ngFor="let x of bit.i18nTooltip.get(groupName);first as isFirst">
                  <ng-container *ngIf="!isFirst">,</ng-container>
                  {{bit.l[groupName + '_' + x]}}
              </ng-container>
          </ng-container>
          <ng-template #not>
              {{bit.l['noTips']}}
          </ng-template>
      </ng-template>
  `
})
export class BitI18nTooltipComponent {
  @ViewChild('ref', {static: true}) ref: TemplateRef<any>;
  @Input() groupName: string;

  constructor(
    public bit: BitService,
  ) {
  }
}
