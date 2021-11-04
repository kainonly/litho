import { ModuleWithProviders, NgModule } from '@angular/core';

import { merge } from 'merge';

import { Config } from './config';
import { WpxSubmitDirective } from './directives/wpx-submit.directive';
import { WpxUploadDirective } from './directives/wpx-upload.directive';
import { WpxService } from './wpx.service';

@NgModule({
  declarations: [WpxSubmitDirective, WpxUploadDirective],
  exports: [WpxSubmitDirective, WpxUploadDirective]
})
export class WpxModule {
  static forRoot(config: Partial<Config>): ModuleWithProviders<WpxModule> {
    return {
      ngModule: WpxModule,
      providers: [{ provide: Config, useValue: merge(new Config(), config) }, WpxService]
    };
  }
}
