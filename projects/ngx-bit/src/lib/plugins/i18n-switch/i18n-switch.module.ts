import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {I18nSwitchComponent} from './i18n-switch.component';

@NgModule({
  exports: [I18nSwitchComponent],
  declarations: [I18nSwitchComponent],
  imports: [NgZorroAntdModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class I18nSwitchModule {
}
