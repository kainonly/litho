import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadOption } from '@weplanx/ng';

export const DB = new InjectionToken<Observable<PouchDB.Database>>('store');
export interface Option extends LoadOption {
  name: string;
}
