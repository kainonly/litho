import { Inject, ModuleWithProviders, NgModule } from '@angular/core';

import { LoadOption, WpxModule, WpxService, WpxShareModule } from '@weplanx/ng';
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

  constructor(@Inject(OPTION) option: LoadOption, wpx: WpxService) {
    wpx.loadScript('richtext', option.url, option.plugins);
  }
}
