import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {BitService} from '../../common/bit.service';

@Component({
  selector: 'bit-i18n-tips',
  templateUrl: './bit-i18n-tips.component.html'
})
export class BitI18nTipsComponent {
  @ViewChild('ref', {static: true}) ref: TemplateRef<any>;
  @Input() name: string;

  constructor(
    public bit: BitService
  ) {
  }
}
