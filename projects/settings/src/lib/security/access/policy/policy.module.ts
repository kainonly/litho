import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { PolicyComponent } from './policy.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [PolicyComponent]
})
export class PolicyModule {}
