import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ClusterComponent } from './cluster.component';

const routes: Route[] = [
  {
    path: '',
    component: ClusterComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ClusterComponent]
})
export class ClusterModule {}
