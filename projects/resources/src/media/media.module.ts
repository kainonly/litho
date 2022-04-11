import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { PicturesComponent } from './pictures/pictures.component';
import { PicturesModule } from './pictures/pictures.module';
import { VideosComponent } from './videos/videos.component';
import { VideosModule } from './videos/videos.module';

export const media: Routes = [
  {
    path: 'pictures',
    component: PicturesComponent,
    data: {
      breadcrumb: '图库'
    }
  },
  {
    path: 'videos',
    component: VideosComponent,
    data: {
      breadcrumb: '视频'
    }
  },
  { path: '', redirectTo: '/resources/media/pictures', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, PicturesModule, VideosModule]
})
export class MediaModule {}
