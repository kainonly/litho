import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  origin: string;
  namespace: string;
  static: string;
  uploads: string;
  language: any;
  withCredentials: boolean;
  i18n: any[];
  i18n_switch: any[];
  page_limit: number;
}
