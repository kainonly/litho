import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class CenterService {
  clear(): Observable<boolean> {
    return of(true);
  }
}
