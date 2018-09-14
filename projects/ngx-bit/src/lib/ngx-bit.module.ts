import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorage} from '@ngx-pwa/local-storage';

import {NgxBitModuleOptions} from './interface';
import {ConfigService} from './config.service';
import {BitService} from './bit.service';
import {EventsService} from './events.service';
import {HttpService} from './http.service';

import {AddService} from './common/add.service';
import {GetService} from './common/get.service';
import {ListsService} from './common/lists.service';
import {OriginListsService} from './common/origin-lists.service';
import {EditService} from './common/edit.service';
import {DeleteService} from './common/delete.service';
import {StatusService} from './common/status.service';
import {SwalService} from './common/swal.service';

import {} from './pipe/empty-object.pipe';
import {} from './pipe/json-parse.pipe';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: []
})
export class NgxBitModule {
  static forRoot(options: NgxBitModuleOptions): ModuleWithProviders {
    if (!options.language) {
      options.language = {};
    }
    if (!options.withCredentials) {
      options.withCredentials = true;
    }
    if (!options.i18n) {
      options.i18n = ['zh_cn', 'en_us'];
    }
    if (!options.i18n_switch) {
      options.i18n_switch = [
        {
          i18n: 'zh_cn',
          name: {
            zh_cn: '中文',
            en_us: 'Chinese'
          }
        },
        {
          i18n: 'en_us',
          name: {
            zh_cn: '英文',
            en_us: 'English'
          }
        }
      ];
    }
    if (!options.page_limit) {
      options.page_limit = 20;
    }

    return {
      ngModule: NgxBitModule,
      providers: [
        {
          provide: ConfigService,
          useValue: {
            origin: options.origin,
            language: options.language,
            withCredentials: options.withCredentials,
            i18n: options.i18n,
            i18n_switch: options.i18n_switch,
            page_limit: options.page_limit
          }
        },
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
    };
  }
}
