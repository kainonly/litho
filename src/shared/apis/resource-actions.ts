import { Injectable } from '@angular/core';

import { ResourceAction } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class ResourceActionsApi extends Api<ResourceAction> {
  override collection = 'resource_actions';
}
