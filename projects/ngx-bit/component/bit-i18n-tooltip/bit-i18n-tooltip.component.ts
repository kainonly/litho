import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'bit-i18n-tooltip',
  templateUrl: './bit-i18n-tooltip.component.html'
})
export class BitI18nTooltipComponent {
  @ViewChild('ref', { static: true }) ref!: TemplateRef<any>;
  @Input() groupName!: string;

  constructor(public bit: BitService) {}
}
