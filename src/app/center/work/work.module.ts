import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { StateComponent } from './chart/state.component';
import { WorkComponent } from './work.component';

const routes: Route[] = [
  {
    path: '',
    component: WorkComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [WorkComponent, StateComponent]
})
export class WorkModule {}
