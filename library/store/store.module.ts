import { Inject, ModuleWithProviders, NgModule } from '@angular/core';

import { WpxModule, WpxService } from '@weplanx/ng';
import { OPTION, Option, WpxStoreService } from '@weplanx/ng/store';

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
    if (!window.hasOwnProperty('PouchDB')) {
      wpx.loadScript(option.url, option.plugins).subscribe(() => {});
    }
  }
}
