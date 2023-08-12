import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DatasetComponent } from './dataset.component';

const routes: Routes = [
  {
    path: '',
    component: DatasetComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [DatasetComponent]
})
export class DatasetModule {}
