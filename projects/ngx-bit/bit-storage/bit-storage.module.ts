import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { loadScript } from 'ngx-bit/operates';
import { Config } from './config';

@NgModule()
export class BitStorageModule {
  private readonly url = 'https://cdn.jsdelivr.net/npm/localforage/dist/localforage.min.js';

  static forRoot(config?: Config): ModuleWithProviders<BitStorageModule> {
    return {
      ngModule: BitStorageModule,
      providers: [
        { provide: Config, useValue: config }
      ]
    };
  }

  constructor(
    config: Config,
    @Inject(DOCUMENT) readonly document: Document
  ) {
    loadScript(document, config?.url || this.url).subscribe(() => {
      if (config) {
        const localforage = Reflect.get(window, 'localforage');
        localforage.config({
          name: config?.name || 'localforage',
          storeName: config?.storeName || 'default',
          version: config?.version || '1.0'
        });
      }
    });
  }
}
