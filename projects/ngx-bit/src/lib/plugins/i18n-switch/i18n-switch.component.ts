import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BitService} from '../../bit.service';
import {ConfigService} from '../../config.service';

@Component({
  selector: 'i18n-switch',
  templateUrl: './i18n-switch.component.html'
})
export class I18nSwitchComponent {
  _i18n = 'zh_cn';
  switch: any[] = [];

  @Output() change: EventEmitter<string> = new EventEmitter();

  @Input()
  get i18n() {
    return this._i18n;
  }

  set i18n(_i18n: string) {
    this._i18n = _i18n;
    this.change.emit(this._i18n);
  }

  constructor(public bit: BitService,
              config: ConfigService) {
    this.switch = config.i18n_switch;
    if (!this.i18n) {
      this.i18n = 'zh_cn';
    }
  }
}
