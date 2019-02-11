// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  bit: {
    origin: '/',
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

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
