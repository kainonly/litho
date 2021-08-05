import { BitConfig } from 'ngx-bit';

const cdn = 'https://cdn.kainonly.com/';

const bit: Partial<BitConfig> = {
  baseUrl: 'https://dev.kainonly.com/sys/',
  assets: cdn,
  i18n: {
    default: 'zh_cn',
    languages: [
      {
        id: 'zh_cn',
        name: '中文'
      },
      {
        id: 'en_us',
        name: 'English'
      }
    ]
  }
};

export const environment = {
  production: true,
  iconUrl: cdn,
  bit
};
