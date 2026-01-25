import { Injectable } from '@angular/core';

import { Menu } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class MenusApi extends Api<Menu> {
  override collection = 'menus';
}
