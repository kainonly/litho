import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BitService} from '../../bit.service';
import {ConfigService} from '../../config.service';

@Component({
  selector: 'i18n-switch',
  templateUrl: './i18n-switch.component.html'
})
export class I18nSwitchComponent {
  @Input() i18n: string;
  @Output() change: EventEmitter<any> = new EventEmitter();
  switch: any[] = [];

  constructor(public bit: BitService,
              config: ConfigService) {
    this.switch = config.i18n_switch;
    if (!this.i18n) {
      this.i18n = 'zh_cn';
    }
  }
}
