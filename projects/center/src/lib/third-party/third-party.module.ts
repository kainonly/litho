import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { ThirdPartyComponent } from './third-party.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [ThirdPartyComponent],
  exports: [ThirdPartyComponent]
})
export class ThirdPartyModule {}
