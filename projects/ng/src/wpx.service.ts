import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';

import { AnyDto } from './types';
import { WpxModel } from './utils/model';
import { WpxStoreService } from './wpx-store.service';

@Injectable({ providedIn: 'root' })
export class WpxService {
  assets = '/assets';
  // private scripts: Map<string, AsyncSubject<void>> = new Map();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private platform: Platform,
    @Optional() private store: WpxStoreService
  ) {}

  setAssets(url: string): void {
    this.assets = url;
  }

  setModel<T>(key: string): WpxModel<AnyDto<T>> {
    return new WpxModel<AnyDto<T>>(key, this.store);
  }

  // private createScript(url: string): HTMLScriptElement | void {
  //   if (!this.platform.isBrowser) {
  //     return;
  //   }
  //   const script = this.document.createElement('script');
  //   script.async = true;
  //   script.type = 'text/javascript';
  //   script.src = url;
  //
  //   this.document.head.append(script);
  //   return script;
  // }
  //
  // loadScript(key: string, option: LoadOption): void {
  //   if (this.scripts.has(key)) {
  //     return;
  //   }
  //   const script = this.createScript(option.url);
  //   const async: AsyncSubject<void> = new AsyncSubject();
  //   this.scripts.set(key, async);
  //   for (const plugin of option.plugins) {
  //     this.createScript(plugin);
  //   }
  //   if (script) {
  //     fromEvent(script, 'load').subscribe(() => {
  //       async.next();
  //       async.complete();
  //     });
  //   }
  // }

  setLocale(id: string): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const l = this.document.location;
    this.document.location = `${l.origin}/${id}/${l.hash}`;
  }
}
