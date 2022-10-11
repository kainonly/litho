import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ThirdPartyComponent } from './third-party.component';

const routes: Route[] = [
  {
    path: '',
    component: ThirdPartyComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ThirdPartyComponent]
})
export class ThirdPartyModule {}
