import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { PicturesComponent } from './pictures/pictures.component';
import { PicturesModule } from './pictures/pictures.module';
import { ResourcesComponent } from './resources.component';
import { VideosComponent } from './videos/videos.component';
import { VideosModule } from './videos/videos.module';

const routes: Routes = [
  {
    path: '',
    component: ResourcesComponent,
    children: [
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
      { path: '', redirectTo: '/resources/pictures', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, PicturesModule, VideosModule, RouterModule.forChild(routes)],
  declarations: [ResourcesComponent]
})
export class ResourcesModule {}
