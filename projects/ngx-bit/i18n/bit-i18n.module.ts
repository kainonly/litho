import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BitPipeModule } from 'ngx-bit/pipe';

import { BitI18nItemDirective } from './bit-i18n-item.directive';
import { BitI18nComponent } from './bit-i18n.component';

@NgModule({
  imports: [CommonModule, NzTabsModule, BitPipeModule],
  declarations: [BitI18nComponent, BitI18nItemDirective],
  exports: [BitI18nComponent, BitI18nItemDirective]
})
export class BitI18nModule {}
