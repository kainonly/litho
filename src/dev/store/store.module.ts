import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxRichtextModule } from '@weplanx/ng/richtext';

import { StoreComponent } from './store.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxRichtextModule, RouterModule.forChild(routes)],
  declarations: [StoreComponent]
})
export class StoreModule {}
