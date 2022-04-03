import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { OfficeComponent } from './office.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [OfficeComponent]
})
export class OfficeModule {}
