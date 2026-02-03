import { Injectable } from '@angular/core';

import { Resource } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class ResourcesApi extends Api<Resource> {
  override collection = 'resources';
}
