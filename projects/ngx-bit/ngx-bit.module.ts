import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NzIconService } from 'ng-zorro-antd/icon';
import { BitConfig } from 'ngx-bit/types';
import { BitService } from './common/bit.service';
import { BitConfigService } from './common/bit-config.service';
import { BitSupportService } from './common/bit-support.service';
import { BitEventsService } from './common/bit-events.service';
import { BitHttpService } from './common/bit-http.service';
import { BitSwalService } from './common/bit-swal.service';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class NgxBitModule {
  static forRoot(config: BitConfig): ModuleWithProviders<NgxBitModule> {
    const service = new BitConfigService();
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        service[key] = config[key];
      }
    }
    return {
      ngModule: NgxBitModule,
      providers: [
        BitService,
        BitHttpService,
        BitEventsService,
        BitSupportService,
        BitSwalService,
        NzIconService,
        { provide: BitConfigService, useValue: service }
      ]
    };
  }

  constructor(
    config: BitConfigService,
    nzIconService: NzIconService
  ) {
    if (config.url.icon) {
      nzIconService.changeAssetsSource(config.url.icon);
    }
  }
}
