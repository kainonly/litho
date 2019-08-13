import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {NzI18nInterface} from 'ng-zorro-antd';

@Injectable()
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
  formControlCol: any = {
    common: {},
    submit: {}
  };
  formLabelCol: any = {
    common: {},
  };
  i18nDefault = 'zh_cn';
  i18nContain: any[] = ['zh_cn'];
  i18nBind: Map<string, NzI18nInterface> = new Map();
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
