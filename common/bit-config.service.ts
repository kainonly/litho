import { Injectable } from '@angular/core';
import { BitConfig } from '../types/bit-config';
import { BitI18nOption } from '../types/bit-i18n-option';

@Injectable({
  providedIn: 'root'
})
export class BitConfigService implements BitConfig {
  readonly url: {
    readonly api: string;
    readonly static: string;
    readonly icon?: string
  };
  readonly api: {
    readonly namespace: string;
    readonly upload: string;
    readonly withCredentials: boolean
  };
  readonly col: {
    readonly [p: string]: any
  };
  readonly i18n: {
    readonly default: string;
    readonly contain: string[];
    readonly switch: BitI18nOption[]
  };
  readonly locale: {
    readonly default: string;
    readonly bind: Map<string, any>
  };
  readonly page: number;
}
