import {Component, EventEmitter, Output} from '@angular/core';
import {BitService} from '../../base/bit.service';
import {ConfigService} from '../../base/config.service';

@Component({
  selector: 'bit-i18n-switch',
  templateUrl: './bit-i18n-switch.component.html'
})
export class BitI18nSwitchComponent {
  @Output() i18nChange: EventEmitter<string> = new EventEmitter();

  constructor(public bit: BitService,
              public config: ConfigService) {
  }

  change(i18n: string) {
    this.i18nChange.emit(i18n);
  }
}
