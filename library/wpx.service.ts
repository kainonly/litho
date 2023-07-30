import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import { AsyncSubject } from 'rxjs';

import { UploadOption } from './types';
import { WpxApi } from './utils/api';
import { WpxModel } from './utils/model';
import { WpxStoreService } from './wpx-store.service';

@Injectable({ providedIn: 'root' })
export class WpxService {
  assets = '/assets';
  upload: AsyncSubject<UploadOption> = new AsyncSubject();

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    @Optional() @Inject(DOCUMENT) private document: Document,
    @Optional() private platform: Platform,
    @Optional() private store: WpxStoreService
  ) {}

  setAssets(v: string): void {
    this.assets = v;
  }

  setUpload(v: UploadOption): void {
    this.upload.next(v);
    this.upload.complete();
  }

  setModel<T>(key: string, api: WpxApi<T>): WpxModel<T> {
    return new WpxModel<T>(`models:${key}`, this.store, api);
  }

  setLocale(id: string): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const location = this.document.location;
    const path = location.pathname.replace(this.locale, id);
    this.document.location = `${location.origin}/${path}`;
  }
}
