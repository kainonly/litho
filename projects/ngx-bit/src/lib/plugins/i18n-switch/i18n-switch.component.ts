import {Component, EventEmitter, Output} from '@angular/core';
import {BitService} from '../../bit.service';
import {ConfigService} from '../../config.service';

@Component({
  selector: 'i18n-switch',
  templateUrl: './i18n-switch.component.html'
})
export class I18nSwitchComponent {
  @Output() change: EventEmitter<any> = new EventEmitter();
  switch: any[] = [];
  i18n = 'zh_cn';

  constructor(public bit: BitService,
              private config: ConfigService) {
    this.switch = config.i18n_switch;
  }
}
