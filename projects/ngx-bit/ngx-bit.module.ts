import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StorageModule } from '@ngx-pwa/local-storage';
import { NzIconService } from 'ng-zorro-antd/icon';
import { BitService } from './common/bit.service';
import { BitConfigService } from './common/bit-config.service';
import { BitSupportService } from './common/bit-support.service';
import { BitEventsService } from './common/bit-events.service';
import { BitHttpService } from './common/bit-http.service';
import { BitSwalService } from './common/bit-swal.service';

@NgModule({
  imports: [
    HttpClientModule,
    StorageModule.forRoot({
      IDBNoWrap: true
    })
  ]
})
export class NgxBitModule {
  static forRoot(config: BitConfigService): ModuleWithProviders<NgxBitModule> {
    return {
      ngModule: NgxBitModule,
      providers: [
        BitService,
        BitHttpService,
        BitEventsService,
        BitSupportService,
        BitSwalService,
        NzIconService,
        { provide: BitConfigService, useValue: config }
      ]
    };
  }

  constructor(
    config: BitConfigService,
    nzIconService: NzIconService
  ) {
    if (config.url.icon !== undefined) {
      nzIconService.changeAssetsSource(config.url.icon);
    }
  }
}
