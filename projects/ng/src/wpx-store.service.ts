import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

declare let localforage: LocalForage;

@Injectable({ providedIn: 'root' })
export class WpxStoreService {
  set<T>(key: string, value: T): Observable<T> {
    return from(localforage.setItem<T>(key, value));
  }

  get<T>(key: string): Observable<T | null> {
    return from(localforage.getItem<T>(key));
  }

  remove(key: string): Observable<void> {
    return from(localforage.removeItem(key));
  }

  clear(): Observable<void> {
    return from(localforage.clear());
  }
}
