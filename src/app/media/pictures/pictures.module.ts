import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxUploadModule } from '@weplanx/ng/upload';

import { PicturesComponent } from './pictures.component';

const routes: Routes = [
  {
    path: '',
    component: PicturesComponent
  }
];

@NgModule({
  imports: [WpxModule, ShareModule, WpxUploadModule, WpxMediaModule, RouterModule.forChild(routes)],
  declarations: [PicturesComponent]
})
export class PicturesModule {}
