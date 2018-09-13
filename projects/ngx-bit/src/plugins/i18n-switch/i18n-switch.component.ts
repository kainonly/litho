import {Component, EventEmitter, Output} from '@angular/core';
import {BitService} from '../../lib/bit.service';
import {ConfigService} from '../../lib/config.service';

@Component({
  selector: 'i18n-switch',
  templateUrl: './i18n-switch.component.html'
})
export class I18nSwitchComponent {
  /**
   * TODO:语言配置获取
   */
  switch: any[] = [];

  constructor(public bit: BitService,
              private config: ConfigService) {
    this.switch = config.i18n_switch;
  }

  /**
   * TODO:语言标识
   * @type {string}
   */
  i18n = 'zh_cn';

  /**
   * TODO:多语言切换发送
   * @type {EventEmitter<any>}
   */
  @Output() change: EventEmitter<any> = new EventEmitter();
}
