import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BitService} from '../../base/bit.service';
import {ConfigService} from '../../base/config.service';

@Component({
  selector: 'i18n-switch',
  templateUrl: './i18n-switch.component.html'
})
export class I18nSwitchComponent {
  switch: any[] = [];

  @Input() i18n = 'zh_cn';
  @Output() i18nChange: EventEmitter<string> = new EventEmitter();

  constructor(public bit: BitService, config: ConfigService) {
    this.switch = config.i18nSwitch;
    if (!this.i18n) {
      this.i18n = 'zh_cn';
    }
  }

  change(i18n: string) {
    this.i18nChange.emit(i18n);
  }
}
