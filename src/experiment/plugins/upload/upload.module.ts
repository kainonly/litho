import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PicturesModule } from '@common/components/pictures/pictures.module';
import { VideosModule } from '@common/components/videos/videos.module';
import { ShareModule } from '@common/share.module';

import { UploadComponent } from './upload.component';

const routes: Routes = [
  {
    path: '',
    component: UploadComponent
  }
];

@NgModule({
  imports: [ShareModule, PicturesModule, VideosModule, RouterModule.forChild(routes)],
  declarations: [UploadComponent]
})
export class UploadModule {}
