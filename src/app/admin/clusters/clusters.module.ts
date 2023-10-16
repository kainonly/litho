import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ClustersComponent } from './clusters.component';
import { DetailComponent } from './detail/detail.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: ClustersComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ClustersComponent, FormComponent, DetailComponent]
})
export class ClustersModule {}
