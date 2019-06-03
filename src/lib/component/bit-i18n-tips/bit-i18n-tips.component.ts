import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {BitService} from '../../base/bit.service';

@Component({
  selector: 'bit-i18n-tips',
  templateUrl: './bit-i18n-tips.component.html'
})
export class BitI18nTipsComponent {
  @ViewChild('ref') ref: TemplateRef<any>;
  @Input() name: string;

  constructor(
    public bit: BitService
  ) {
  }
}
