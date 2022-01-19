import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxShareModule } from '@weplanx/common';
import { NzProgressModule } from 'ng-zorro-antd/progress';

import { WpxTransportComponent } from './transport.component';

@NgModule({
  imports: [WpxShareModule, ScrollingModule, NzProgressModule],
  declarations: [WpxTransportComponent],
  exports: [WpxTransportComponent]
})
export class WpxTransportModule {}
