import { ModuleWithProviders, NgModule } from '@angular/core';

import { merge } from 'merge';

import { WpxConfig } from './wpx-config';
import { WpxService } from './wpx.service';

@NgModule()
export class WpxModule {
  static forRoot(config: Partial<WpxConfig>): ModuleWithProviders<WpxModule> {
    return {
      ngModule: WpxModule,
      providers: [{ provide: WpxConfig, useValue: merge(new WpxConfig(), config) }, WpxService]
    };
  }
}
