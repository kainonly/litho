import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorage} from '@ngx-pwa/local-storage';

import {ConfigService} from './base/config.service';
import {BitService} from './base/bit.service';
import {EventsService} from './base/events.service';
import {HttpService} from './base/http.service';
import {SwalService} from './common/swal.service';
import {StorageService} from './common/storage.service';
import {NzIconService} from 'ng-zorro-antd';
import {environment} from '../../../../src/environments/environment';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ConfigService,
    LocalStorage,
    BitService,
    HttpService,
    EventsService,
    SwalService,
    StorageService
  ]
})
export class NgxBitModule {
  constructor(nzIconService: NzIconService) {
    // nzIconService.changeAssetsSource('');
  }
}
