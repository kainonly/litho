import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { BitI18nSwitchComponent } from './bit-i18n-switch.component';
import { BitI18nTooltipComponent } from './bit-i18n-tooltip.component';
import { BitErrorTipComponent } from './bit-error-tip.component';

@NgModule({
  exports: [
    BitI18nSwitchComponent,
    BitI18nTooltipComponent,
    BitErrorTipComponent
  ],
  declarations: [
    BitI18nSwitchComponent,
    BitI18nTooltipComponent,
    BitErrorTipComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzRadioModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BitExtModule {
}
