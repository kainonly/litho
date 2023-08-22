import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DatasetsComponent } from './datasets.component';

const routes: Routes = [
  {
    path: '',
    component: DatasetsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [DatasetsComponent]
})
export class DatasetsModule {}
