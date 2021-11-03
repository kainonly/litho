import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { merge } from 'merge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { Config } from './config';
import { WpxSubmitDirective } from './directives/wpx-submit.directive';
import { WpxUploadDirective } from './directives/wpx-upload.directive';
import { WpxSearchBoxComponent } from './wpx-search-box/wpx-search-box.component';
import { WpxTableBoxComponent } from './wpx-table-box/wpx-table-box.component';
import { WpxService } from './wpx.service';

@NgModule({
  imports: [FormsModule, NzButtonModule, NzToolTipModule, NzPopoverModule, NzRadioModule, NzIconModule],
  declarations: [WpxSubmitDirective, WpxUploadDirective, WpxSearchBoxComponent, WpxTableBoxComponent],
  exports: [WpxSubmitDirective, WpxUploadDirective, WpxSearchBoxComponent, WpxTableBoxComponent]
})
export class WpxModule {
  static forRoot(config: Partial<Config>): ModuleWithProviders<WpxModule> {
    return {
      ngModule: WpxModule,
      providers: [{ provide: Config, useValue: merge(new Config(), config) }, WpxService]
    };
  }
}
