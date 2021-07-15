import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { BitPipeModule } from 'ngx-bit/pipe';

import { BitI18nSwitchComponent } from './bit-i18n-switch.component';

@NgModule({
  imports: [FormsModule, CommonModule, NzRadioModule, BitPipeModule],
  declarations: [BitI18nSwitchComponent],
  exports: [BitI18nSwitchComponent]
})
export class BitComponentModule {}
