import {Component, EventEmitter, Output} from '@angular/core';
import {BitService} from '../common/bit.service';
import {ConfigService} from '../common/config.service';

@Component({
  selector: 'bit-i18n-switch',
  template: `
    <ng-container *ngIf="config.i18nSwitch.length>1">
      <nz-radio-group [(ngModel)]="bit.i18n"
                      (ngModelChange)="change($event)"
                      [nzSize]="'small'">
        <label *ngFor="let x of config.i18nSwitch" nz-radio-button [nzValue]="x.i18n">
          <span><b>{{x.name[bit.locale]}}</b></span>
        </label>
      </nz-radio-group>
    </ng-container>
  `
})
export class BitI18nSwitchComponent {
  @Output() i18nChange: EventEmitter<string> = new EventEmitter();

  constructor(
    public bit: BitService,
    public config: ConfigService
  ) {
  }

  /**
   * i18n id change
   */
  change(i18n: string) {
    this.i18nChange.emit(i18n);
  }
}
