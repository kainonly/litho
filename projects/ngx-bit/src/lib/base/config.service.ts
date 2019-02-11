import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  origin = '';
  namespace = '';
  static = '';
  uploads = '';
  with_credentials = false;
  http_customize = false;
  i18n: any[] = ['zh_cn'];
  i18n_switch: any[] = [
    {
      i18n: 'zh_cn',
      name: {
        zh_cn: '中文',
        en_us: 'Chinese'
      }
    }
  ];
  page_limit = 20;
}
