import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WpxService } from '@weplanx/ng';

let windowAny: any = window;

@Injectable()
export class WpxStoreService {
  private url = 'https://cdn.kainonly.com/assets/pouchdb/pouchdb-7.3.1.min.js';
  private plugins: string[] = [];

  constructor(private wpx: WpxService) {}

  setup(url: string, plugins: string[]): void {
    this.url = url;
    this.plugins = plugins;
  }

  loadScript(): Observable<void> {
    return this.wpx.loadScript(this.url, this.plugins);
  }

  create(): void {}
}
