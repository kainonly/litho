import { Injectable } from '@angular/core';

import { Locale } from './types';

@Injectable({
  providedIn: 'root'
})
export class Config {
  locales!: Locale[];
}
