import { en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { BitConfig } from 'ngx-bit';

const bit: BitConfig = {
  url: {
    api: 'https://dev.kainonly.com',
    static: 'https://cdn.kainonly.com/',
    icon: 'https://cdn.kainonly.com/'
  },
  api: {
    namespace: '/system',
    withCredentials: true,
    upload: 'https://cdn-1252852151.cos.ap-guangzhou.myqcloud.com',
    uploadStorage: 'cos',
    uploadFetchSigned: '/system/main/presigned',
    uploadFetchSignedMethod: 'POST',
    uploadSize: 102400
  },
  curd: {
    get: '/get',
    lists: '/lists',
    originLists: '/originLists',
    add: '/add',
    edit: '/edit',
    status: '/edit',
    delete: '/delete'
  },
  col: {
    label: {
      nzXXl: 4,
      nzXl: 5,
      nzLg: 6,
      nzMd: 7,
      nzSm: 24
    },
    control: {
      nzXXl: 8,
      nzXl: 9,
      nzLg: 10,
      nzMd: 14,
      nzSm: 24
    },
    submit: {
      nzXXl: { span: 8, offset: 4 },
      nzXl: { span: 9, offset: 5 },
      nzLg: { span: 10, offset: 6 },
      nzMd: { span: 14, offset: 6 },
      nzSm: { span: 24, offset: 0 }
    }
  },
  locale: {
    default: 'zh_cn',
    mapping: new Map<number, string>([
      [0, 'zh_cn'],
      [1, 'en_us']
    ]),
    bind: new Map<string, any>([
      ['zh_cn', zh_CN],
      ['en_us', en_US]
    ])
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
  },
  page: 10
};

export const environment = {
  production: false,
  bit
};
