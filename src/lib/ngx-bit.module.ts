import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorage} from '@ngx-pwa/local-storage';

import {ConfigService} from './base/config.service';
import {BitService} from './base/bit.service';
import {EventsService} from './base/events.service';
import {HttpService} from './base/http.service';
import {SwalService} from './common/swal.service';
import {StorageService} from './common/storage.service';
import {NzIconService} from 'ng-zorro-antd';

@NgModule({
  imports: [HttpClientModule]
})
export class NgxBitModule {
  static forRoot(config: any): ModuleWithProviders<NgxBitModule> {
    return {
      ngModule: NgxBitModule,
      providers: [
        LocalStorage,
        BitService,
        HttpService,
        EventsService,
        SwalService,
        StorageService,
        {provide: ConfigService, useValue: config},
      ],
    };
  }

  constructor(
    nzIconService: NzIconService,
    configSerive: ConfigService
  ) {
    nzIconService.changeAssetsSource(configSerive.iconUrl);
  }
}
