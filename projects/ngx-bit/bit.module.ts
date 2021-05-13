import { ModuleWithProviders, NgModule } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import merge from 'merge';
import { BitService } from './common/bit.service';
import { BitHttpService } from './common/bit-http.service';
import { BitEventsService } from './common/bit-events.service';
import { BitConfigService } from './common/bit-config.service';
import { BitConfig } from './typings';

@NgModule()
export class BitModule {
  static forRoot(config: BitConfig): ModuleWithProviders<BitModule> {
    return {
      ngModule: BitModule,
      providers: [
        NzIconService,
        BitService,
        BitHttpService,
        BitEventsService,
        {
          provide: BitConfigService,
          useValue: merge.recursive(new BitConfigService(), config)
        }
      ]
    };
  }

  constructor(
    config: BitConfigService,
    nzIcon: NzIconService
  ) {
    if (config.url.icon) {
      nzIcon.changeAssetsSource(config.url.icon);
    }
  }
}
