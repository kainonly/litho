import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { merge } from 'merge';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { Config } from './config';
import { WpxSubmitDirective } from './directives/wpx-submit.directive';
import { WpxUploadDirective } from './directives/wpx-upload.directive';
import { WpxTableComponent } from './wpx-table/wpx-table.component';
import { WpxService } from './wpx.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzToolTipModule,
    NzPopoverModule,
    NzRadioModule,
    NzIconModule,
    NzTableModule,
    NzAlertModule,
    NzGridModule,
    NzDrawerModule,
    NzCheckboxModule,
    NzFormModule,
    NzSpaceModule
  ],
  declarations: [WpxSubmitDirective, WpxUploadDirective, WpxTableComponent],
  exports: [WpxSubmitDirective, WpxUploadDirective, WpxTableComponent]
})
export class WpxModule {
  static forRoot(config: Partial<Config>): ModuleWithProviders<WpxModule> {
    return {
      ngModule: WpxModule,
      providers: [{ provide: Config, useValue: merge(new Config(), config) }, WpxService]
    };
  }
}
