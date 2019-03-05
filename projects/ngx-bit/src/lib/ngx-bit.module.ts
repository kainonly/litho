import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorage} from '@ngx-pwa/local-storage';

import {ConfigService} from './base/config.service';
import {BitService} from './base/bit.service';
import {EventsService} from './base/events.service';
import {HttpService} from './base/http.service';
import {SwalService} from './common/swal.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ConfigService,
    LocalStorage,
    BitService,
    HttpService,
    EventsService,
    SwalService
  ]
})
export class NgxBitModule {
}
