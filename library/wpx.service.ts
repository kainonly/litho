import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AsyncSubject, fromEvent } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WpxService {
  assets = '/assets';
  scripts: Map<string, AsyncSubject<void>> = new Map();

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private platform: Platform
  ) {}

  setAssets(url: string): void {
    this.assets = url;
  }

  private createScript(url: string): HTMLScriptElement | void {
    if (!this.platform.isBrowser) {
      return;
    }
    const script = this.document.createElement('script');
    script.src = url;
    script.async = true;
    this.document.head.append(script);
    return script;
  }

  loadScript(key: string, url: string, plugins: string[]): void {
    if (this.scripts.has(key)) {
      return;
    }
    const script = this.createScript(url);
    const async: AsyncSubject<void> = new AsyncSubject();
    this.scripts.set(key, async);
    for (const plugin of plugins) {
      this.createScript(plugin);
    }
    if (script) {
      fromEvent(script, 'load').subscribe(() => {
        async.next();
        async.complete();
      });
    }
  }

  setLocale(id: string): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const l = this.document.location;
    this.document.location = `${l.origin}/${id}/${l.hash}`;
  }
}
