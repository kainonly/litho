import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';

import { WpxApi } from './utils/api';
import { WpxModel } from './utils/model';
import { WpxStoreService } from './wpx-store.service';

@Injectable({ providedIn: 'root' })
export class WpxService {
  assets = '/assets';

  constructor(
    @Optional() @Inject(DOCUMENT) private document: Document,
    @Optional() private platform: Platform,
    @Optional() private store: WpxStoreService
  ) {}

  setAssets(url: string): void {
    this.assets = url;
  }

  setModel<T>(key: string, api: WpxApi<T>): WpxModel<T> {
    return new WpxModel<T>(`models:${key}`, this.store, api);
  }

  setLocale(id: string): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const l = this.document.location;
    this.document.location = `${l.origin}/${id}/${l.hash}`;
  }
}
