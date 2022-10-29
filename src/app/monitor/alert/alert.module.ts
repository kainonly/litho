import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AlertComponent } from './alert.component';

const routes: Route[] = [
  {
    path: '',
    component: AlertComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [AlertComponent]
})
export class AlertModule {}
