import { ModuleWithProviders, NgModule } from '@angular/core';

import { BitConfig } from './common/bit-config';
import { BitHttpService } from './common/bit-http.service';
import { BitService } from './common/bit.service';

@NgModule()
export class BitModule {
  static forRoot(config: BitConfig): ModuleWithProviders<BitModule> {
    return {
      ngModule: BitModule,
      providers: [
        {
          provide: BitConfig,
          useValue: config
        },
        BitService,
        BitHttpService
      ]
    };
  }
}
