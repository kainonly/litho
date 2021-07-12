import { NgModule } from '@angular/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BitErrorTipComponent } from './bit-error-tip/bit-error-tip.component';
import { BitI18nSwitchComponent } from './bit-i18n-switch/bit-i18n-switch.component';
import { BitI18nTooltipComponent } from './bit-i18n-tooltip/bit-i18n-tooltip.component';
import { BitPrintComponent } from './bit-print/bit-print.component';

@NgModule({
  imports: [FormsModule, CommonModule, NzRadioModule],
  declarations: [BitErrorTipComponent, BitI18nSwitchComponent, BitI18nTooltipComponent, BitPrintComponent],
  exports: [BitErrorTipComponent, BitI18nSwitchComponent, BitI18nTooltipComponent, BitPrintComponent]
})
export class BitComponentModule {}
