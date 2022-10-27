import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { PicturesComponent } from './pictures.component';

const routes: Routes = [
  {
    path: '',
    component: PicturesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [PicturesComponent]
})
export class PicturesModule {}
