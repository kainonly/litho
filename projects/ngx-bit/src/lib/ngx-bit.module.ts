import {ModuleWithProviders, NgModule} from '@angular/core';
import {BitService} from './bit.service';
import {ConfigService} from './config.service';
import {NgxBitModuleOptions} from './interface';

@NgModule()
export class NgxBitModule {
  static forRoot(options: NgxBitModuleOptions): ModuleWithProviders {
    return {
      ngModule: NgxBitModule,
      providers: [
        {
          provide: ConfigService, useValue: {
            origin: options.origin
          }
        },
        BitService
      ]
    };
  }
}
