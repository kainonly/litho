import { DOCUMENT } from '@angular/common';
import { Inject, ModuleWithProviders, NgModule } from '@angular/core';

import { loadScript } from 'ngx-bit';

import { BitSwalService } from './bit-swal.service';
import { Config } from './config';

@NgModule()
export class BitSwalModule {
  private readonly url = 'https://cdn.jsdelivr.net/npm/sweetalert2/dist/sweetalert2.all.min.js';

  static forRoot(config?: Config): ModuleWithProviders<BitSwalModule> {
    return {
      ngModule: BitSwalModule,
      providers: [{ provide: Config, useValue: config }, BitSwalService]
    };
  }

  constructor(config: Config, swal: BitSwalService, @Inject(DOCUMENT) readonly document: any) {
    loadScript(document, config?.url || this.url).subscribe(_ => {
      swal.ready.next(Reflect.get(window, 'Swal'));
      swal.ready.complete();
    });
  }
}
