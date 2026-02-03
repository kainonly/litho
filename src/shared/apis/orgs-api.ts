import { Injectable } from '@angular/core';

import { Org } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class OrgsApi extends Api<Org> {
  override collection = 'orgs';
}
