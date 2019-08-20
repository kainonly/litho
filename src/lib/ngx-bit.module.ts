import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {StorageModule} from '@ngx-pwa/local-storage';
import {NzIconService} from 'ng-zorro-antd';

import {ConfigService} from './common/config.service';
import {BitService} from './common/bit.service';
import {EventsService} from './common/events.service';
import {HttpService} from './common/http.service';
import {SwalService} from './plugin/swal.service';
import {StorageService} from './plugin/storage.service';

@NgModule({
  imports: [
    HttpClientModule,
    StorageModule.forRoot({
      IDBNoWrap: true
    })
  ]
})
export class NgxBitModule {
  static forRoot(config: any): ModuleWithProviders<NgxBitModule> {
    return {
      ngModule: NgxBitModule,
      providers: [
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
