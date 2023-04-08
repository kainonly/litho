import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideosModule as AppVideosModule } from '@common/components/videos/videos.module';
import { ShareModule } from '@common/share.module';

import { VideosComponent } from './videos.component';

const routes: Routes = [
  {
    path: '',
    component: VideosComponent
  }
];

@NgModule({
  imports: [ShareModule, AppVideosModule, RouterModule.forChild(routes)],
  declarations: [VideosComponent]
})
export class VideosModule {}
