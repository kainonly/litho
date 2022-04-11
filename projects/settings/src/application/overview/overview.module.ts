import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [OverviewComponent]
})
export class OverviewModule {}
