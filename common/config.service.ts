import { Injectable } from '@angular/core';
import { NzI18nInterface } from 'ng-zorro-antd';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  originUrl = '';
  staticUrl = '';
  iconUrl = '';
  namespace = '';
  uploadsUrl = '';
  uploadsPath = '';
  withCredentials = false;
  httpInterceptor = false;
  breadcrumbTop = 0;
  pageLimit = 20;
  col: any = {};
  localeDefault = 'zh_cn';
  localeBind: Map<string, NzI18nInterface> = new Map();
  i18nDefault = 'zh_cn';
  i18nContain: any[] = ['zh_cn'];
  i18nSwitch: any[] = [
    {
      i18n: 'zh_cn',
      name: {
        zh_cn: '中文',
        en_us: 'Chinese'
      }
    }
  ];
  interceptor = (res) => of(res);
}
