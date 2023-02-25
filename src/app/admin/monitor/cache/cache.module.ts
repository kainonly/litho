import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { CacheComponent } from './cache.component';

const routes: Routes = [
  {
    path: '',
    component: CacheComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [CacheComponent]
})
export class CacheModule {}
