import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ExtendComponent } from './extend.component';

const routes: Routes = [
  {
    path: '',
    component: ExtendComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ExtendComponent]
})
export class ExtendModule {}
