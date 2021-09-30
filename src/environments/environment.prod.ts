import { WpxConfig } from '@weplanx/ngx';

const cdn = 'https://cdn.kainonly.com';

const wpx: Partial<WpxConfig> = {
  baseUrl: 'https://api.kainonly.com/xapi',
  assets: cdn
};

export const environment = {
  production: false,
  iconUrl: cdn,
  wpx
};
