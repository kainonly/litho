import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DatasourceComponent } from './datasource.component';

const routes: Routes = [
  {
    path: '',
    component: DatasourceComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [DatasourceComponent]
})
export class DatasourceModule {}
