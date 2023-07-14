import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OverviewComponent]
})
export class OverviewModule {}
