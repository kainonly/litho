import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { RedisComponent } from './redis.component';

const routes: Routes = [
  {
    path: '',
    component: RedisComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [RedisComponent]
})
export class RedisModule {}
