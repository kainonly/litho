import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { EnvironmentComponent } from './environment.component';

const routes: Routes = [
  {
    path: '',
    component: EnvironmentComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [EnvironmentComponent]
})
export class EnvironmentModule {}
