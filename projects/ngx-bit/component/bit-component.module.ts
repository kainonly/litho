import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { BitPipeModule } from 'ngx-bit/pipe';

import { BitI18nSwitchComponent } from './bit-i18n-switch.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NzRadioModule,
    BitPipeModule,
    NzPipesModule,
    NzListModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzTypographyModule,
    NzDescriptionsModule,
    NzTagModule,
    NzTabsModule
  ],
  declarations: [BitI18nSwitchComponent],
  exports: [BitI18nSwitchComponent]
})
export class BitComponentModule {}
