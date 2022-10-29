import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { CollectorComponent } from './collector.component';

const routes: Routes = [
  {
    path: '',
    component: CollectorComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [CollectorComponent]
})
export class CollectorModule {}
