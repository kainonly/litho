import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  origin = '';
  namespace = '';
  static = '';
  uploads = '';
  withCredentials = false;
  httpInterceptor = false;
  i18n: any[] = ['zh_cn'];
  i18nSwitch: any[] = [
    {
      i18n: 'zh_cn',
      name: {
        zh_cn: '中文',
        en_us: 'Chinese'
      }
    }
  ];
  pageLimit = 20;
}
