import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {BitFormExplainComponent} from './component/bit-form-explain/bit-form-explain.component';
import {BitI18nSwitchComponent} from './component/bit-i18n-switch/bit-i18n-switch.component';

@NgModule({
  exports: [
    BitFormExplainComponent,
    BitI18nSwitchComponent,
  ],
  declarations: [
    BitFormExplainComponent,
    BitI18nSwitchComponent
  ],
  imports: [NgZorroAntdModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxBitExtModule {

}
