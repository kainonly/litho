import { en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { BitConfig } from 'ngx-bit';

const cdn = 'https://cdn.kainonly.com/';

const bit: Partial<BitConfig> = {
  baseUrl: 'http://localhost:8000/',
  assets: cdn,
  locale: {
    default: 'zh_cn',
    mapping: ['zh_cn', 'en_us'],
    bind: [zh_CN, en_US]
  },
  i18n: {
    default: 'zh_cn',
    contain: ['zh_cn', 'en_us'],
    switch: [
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
    ]
  }
};

export const environment = {
  production: false,
  iconUrl: cdn,
  bit
};
