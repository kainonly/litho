import { ModuleWithProviders, NgModule } from '@angular/core';

import { merge } from 'merge';

import { BitConfig } from './bit-config';
import { BitService } from './bit.service';

@NgModule()
export class BitModule {
  static forRoot(config: Partial<BitConfig>): ModuleWithProviders<BitModule> {
    return {
      ngModule: BitModule,
      providers: [{ provide: BitConfig, useValue: merge(new BitConfig(), config) }, BitService]
    };
  }
}
