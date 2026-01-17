import { HttpContextToken } from '@angular/common/http';

export const EXTERNAL = new HttpContextToken<boolean>(() => false);

export * from './shared.module';
export * from './global';
export * from './utils/filter';
export * from './utils/helper';
export * from './utils/loading';
export * from './utils/model';
