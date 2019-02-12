export const environment = {
  production: true,
  bit: {
    origin: '/assets/api',
    namespace: '',
    static: '/',
    uploads: '/uploads',
    page_limit: 20,
    with_credentials: false,
    http_customize: false,
    i18n: ['zh_cn', 'en_us'],
    i18n_switch: [
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
