import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BitPipeModule } from 'ngx-bit/pipe';

import { BitI18nItemDirective } from './bit-i18n-item.directive';
import { BitI18nTabComponent } from './bit-i18n-tab.component';
import { BitI18nService } from './bit-i18n.service';
import { Config } from './config';

@NgModule({
  imports: [CommonModule, NzTabsModule, BitPipeModule],
  declarations: [BitI18nTabComponent, BitI18nItemDirective],
  exports: [BitI18nTabComponent, BitI18nItemDirective]
})
export class BitI18nModule {
  static forRoot(config: Config): ModuleWithProviders<BitI18nModule> {
    return {
      ngModule: BitI18nModule,
      providers: [{ provide: Config, useValue: config }, BitI18nService]
    };
  }
}
