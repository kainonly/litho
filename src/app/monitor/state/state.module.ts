import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { StateComponent } from './state.component';

const routes: Route[] = [
  {
    path: '',
    component: StateComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [StateComponent]
})
export class StateModule {}
