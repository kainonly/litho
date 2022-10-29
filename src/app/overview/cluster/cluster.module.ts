import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ClusterComponent } from './cluster.component';

const routes: Routes = [
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
