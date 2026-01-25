import { Injectable } from '@angular/core';

import { Route } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class RoutesApi extends Api<Route> {
  override collection = 'routes';
}
