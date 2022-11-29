import { ModuleWithProviders, NgModule } from '@angular/core';

import { LoadOption, WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';

import { WpxRichtextComponent } from './richtext.component';
import { OPTION } from './types';

@NgModule({
  imports: [WpxModule, WpxMediaModule, WpxShareModule],
  declarations: [WpxRichtextComponent],
  exports: [WpxRichtextComponent]
})
export class WpxRichtextModule {
  static forRoot(option: LoadOption): ModuleWithProviders<WpxRichtextModule> {
    return {
      ngModule: WpxRichtextModule,
      providers: [{ provide: OPTION, useValue: option }]
    };
  }
}
