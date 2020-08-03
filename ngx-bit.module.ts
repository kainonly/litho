import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StorageModule } from '@ngx-pwa/local-storage';
import { NzIconService } from 'ng-zorro-antd';
import { BitConfigService } from './common/bit-config.service';
import { BitService } from './common/bit.service';
import { EventsService } from './common/events.service';
import { HttpService } from './common/http.service';
import { SwalService } from './plugin/swal.service';
import { StorageService } from './plugin/storage.service';
import { BitConfig } from './types/bit-config';

@NgModule({
  imports: [
    HttpClientModule,
    StorageModule.forRoot({
      IDBNoWrap: true
    })
  ]
})
export class NgxBitModule {
  static forRoot(config: BitConfig): ModuleWithProviders<NgxBitModule> {
    return {
      ngModule: NgxBitModule,
      providers: [
        BitService,
        HttpService,
        EventsService,
        SwalService,
        StorageService,
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
