import { Component } from '@angular/core';

import { BITCONFIG, BitService } from 'ngx-bit';

@Component({
  selector: 'bit-i18n-switch',
  template: `
    <ng-container *ngIf="config.i18n.contain.length > 1">
      <nz-radio-group [(ngModel)]="bit.i18n" (ngModelChange)="i18nChanged($event)">
        <ng-container *ngFor="let item of config.i18n.switch">
          <label nz-radio-button [nzValue]="item.i18n">
            <span>
              <b>{{ item.name | object: bit.locale }}</b>
            </span>
          </label>
        </ng-container>
      </nz-radio-group>
    </ng-container>
  `
})
export class BitI18nSwitchComponent {
  constructor(public bit: BitService, public config: BITCONFIG) {}

  i18nChanged(value: string): void {
    this.bit.i18nChanged!.next(value);
  }
}
