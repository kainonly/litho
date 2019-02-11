import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorage} from '@ngx-pwa/local-storage';

import {ConfigService} from './base/config.service';
import {BitService} from './base/bit.service';
import {EventsService} from './base/events.service';
import {HttpService} from './base/http.service';
import {AddService} from './curd/add.service';
import {GetService} from './curd/get.service';
import {ListsService} from './curd/lists.service';
import {OriginListsService} from './curd/origin-lists.service';
import {EditService} from './curd/edit.service';
import {DeleteService} from './curd/delete.service';
import {StatusService} from './curd/status.service';
import {SwalService} from './common/swal.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ConfigService,
    LocalStorage,
    BitService,
    HttpService,
    EventsService,
    AddService,
    DeleteService,
    EditService,
    GetService,
    ListsService,
    OriginListsService,
    StatusService,
    SwalService
  ]
})
export class NgxBitModule {
}
