import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AnyDto, Api, ApiOptions, Filter, FindOption, httpOptions } from '@weplanx/ng';

@Injectable()
export class AuditService extends Api<any> {
  logs<T>(name: string, filter: Filter<T>, options?: FindOption<T>): Observable<Array<AnyDto<T>>> {
    return this.http.get<Array<AnyDto<T>>>(this.url(name), httpOptions(options as ApiOptions<T>, filter));
  }
}
