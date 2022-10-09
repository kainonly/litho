import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxUploadModule } from '@weplanx/ng/upload';

import { VideosComponent } from './videos.component';

const routes: Routes = [
  {
    path: '',
    component: VideosComponent
  }
];

@NgModule({
  imports: [WpxModule, ShareModule, WpxUploadModule, WpxMediaModule, RouterModule.forChild(routes)],
  declarations: [VideosComponent]
})
export class VideosModule {}
