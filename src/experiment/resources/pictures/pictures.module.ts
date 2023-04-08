import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PicturesModule as AppPicturesModule } from '@common/components/pictures/pictures.module';
import { ShareModule } from '@common/share.module';

import { PicturesComponent } from './pictures.component';

const routes: Routes = [
  {
    path: '',
    component: PicturesComponent
  }
];

@NgModule({
  imports: [ShareModule, AppPicturesModule, RouterModule.forChild(routes)],
  declarations: [PicturesComponent]
})
export class PicturesModule {}
