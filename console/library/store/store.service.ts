/// <reference types="localforage" />

declare let localforage: LocalForage;

import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable()
export class WpxStoreService {
  constructor() {}

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
