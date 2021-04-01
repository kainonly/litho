import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { BitI18nSwitchComponent } from './bit-i18n-switch/bit-i18n-switch.component';
import { BitI18nTooltipComponent } from './bit-i18n-tooltip/bit-i18n-tooltip.component';
import { BitErrorTipComponent } from './bit-error-tip/bit-error-tip.component';
import { BitHeaderComponent } from './bit-header/bit-header.component';
import { BitPrintComponent } from './bit-print/bit-print.component';
import { BitTransportComponent } from './bit-transport/bit-transport.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { BitDirectiveModule } from 'ngx-bit/directive';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  exports: [
    BitI18nSwitchComponent,
    BitI18nTooltipComponent,
    BitErrorTipComponent,
    BitHeaderComponent,
    BitPrintComponent,
    BitTransportComponent
  ],
  declarations: [
    BitI18nSwitchComponent,
    BitI18nTooltipComponent,
    BitErrorTipComponent,
    BitHeaderComponent,
    BitPrintComponent,
    BitTransportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzRadioModule,
    NzProgressModule,
    NzUploadModule,
    NzPopoverModule,
    NzIconModule,
    NzBadgeModule,
    NzListModule,
    NzTypographyModule,
    NzMessageModule,
    BitDirectiveModule,
    ScrollingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BitExtModule {
}
