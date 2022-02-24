import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { EnterpriseComponent } from './enterprise.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [EnterpriseComponent]
})
export class EnterpriseModule {}
