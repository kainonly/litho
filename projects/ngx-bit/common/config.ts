import { Injectable } from '@angular/core';
import { Grid, I18nOption, Upload } from './types';

@Injectable({ providedIn: 'root' })
export class BITCONFIG {
  baseUrl: string = '/api/';
  assets: string = '/assets/';
  upload?: Upload;
  grid: Grid = {
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
  };
  locale!: {
    default: string;
    mapping: string[];
    bind: any[];
  };
  i18n!: {
    default: string;
    contain: string[];
    switch: I18nOption[];
  };
  page!: number;
}
