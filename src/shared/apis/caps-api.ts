import { Injectable } from '@angular/core';

import { Cap } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class CapsApi extends Api<Cap> {
  override collection = 'caps';
}
