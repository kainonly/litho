import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { StoreComponent } from './store.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [StoreComponent]
})
export class StoreModule {}
