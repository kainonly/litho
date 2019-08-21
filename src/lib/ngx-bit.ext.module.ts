import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {BitI18nSwitchComponent} from './component/bit-i18n-switch.component';
import {BitI18nTooltipComponent} from './component/bit-i18n-tooltip.component';
import {BitErrorTipComponent} from './component/bit-error-tip.component';

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
  imports: [NgZorroAntdModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxBitExtModule {
}
