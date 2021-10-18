import { WpxConfig } from '@weplanx/ngx';

const cdn = 'https://cdn.kainonly.com';

const wpx: Partial<WpxConfig> = {
  baseUrl: 'https://dev.kainonly.com/xapi',
  assets: cdn
};

export const environment = {
  production: false,
  cdn,
  wpx
};
