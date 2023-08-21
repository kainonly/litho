import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { NodesComponent } from './nodes.component';

const routes: Routes = [
  {
    path: '',
    component: NodesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [NodesComponent]
})
export class NodesModule {}
