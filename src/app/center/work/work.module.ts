import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ProfileComponent } from './profile/profile.component';
import { WorkComponent } from './work.component';

const routes: Route[] = [
  {
    path: '',
    component: WorkComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [WorkComponent, ProfileComponent]
})
export class WorkModule {}
