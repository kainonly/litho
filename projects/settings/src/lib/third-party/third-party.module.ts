import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { EnterpriseComponent } from './enterprise/enterprise.component';
import { EnterpriseModule } from './enterprise/enterprise.module';

export const third_party: Routes = [
  {
    path: 'enterprise',
    component: EnterpriseComponent
  }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, EnterpriseModule]
})
export class ThirdPartyModule {}
