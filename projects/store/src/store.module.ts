import { Inject, ModuleWithProviders, NgModule } from '@angular/core';

import { WpxModule, WpxService } from '@weplanx/ng';

import { WpxStoreService } from './store.service';
import { OPTION, Option } from './types';

@NgModule({
  imports: [WpxModule]
})
export class WpxStoreModule {
  static forRoot(option: Option): ModuleWithProviders<WpxStoreModule> {
    return {
      ngModule: WpxStoreModule,
      providers: [{ provide: OPTION, useValue: option }, WpxStoreService]
    };
  }

  constructor(@Inject(OPTION) option: Option, wpx: WpxService) {
    wpx.loadScript('store', option);
  }
}
