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
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { BitPipeModule } from 'ngx-bit/pipe';

import { BitI18nSwitchComponent } from './bit-i18n-switch.component';
import { BitI18nComponent } from './bit-i18n/bit-i18n.component';
import { NzTagModule } from 'ng-zorro-antd/tag';

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
    NzTagModule
  ],
  declarations: [BitI18nSwitchComponent, BitI18nComponent],
  exports: [BitI18nSwitchComponent, BitI18nComponent]
})
export class BitComponentModule {}
