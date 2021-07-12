import { ModuleWithProviders, NgModule } from '@angular/core';
import { BitService } from './common/bit.service';
import { BitHttpService } from './common/bit-http.service';
import { BitConfig } from './common/bit-config';

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
