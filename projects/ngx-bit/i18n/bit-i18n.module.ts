import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { BitI18nBtnComponent } from './bit-i18n-btn/bit-i18n-btn.component';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [BitI18nBtnComponent],
  imports: [NzButtonModule, NzIconModule, NzDrawerModule, NzTabsModule, CommonModule],
  exports: [BitI18nBtnComponent]
})
export class BitI18nModule {}
