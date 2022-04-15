import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { FactoryComponent } from './factory/factory.component';
import { FactoryModule, factory } from './factory/factory.module';
import { PicturesComponent } from './pictures/pictures.component';
import { PicturesModule } from './pictures/pictures.module';
import { VideosComponent } from './videos/videos.component';
import { VideosModule } from './videos/videos.module';

export const application: Routes = [
  {
    path: 'factory',
    component: FactoryComponent,
    children: factory,
    data: {
      breadcrumb: '内容生成器'
    }
  },
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
  { path: '', redirectTo: '/admin/application/factory/home', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, FactoryModule, PicturesModule, VideosModule]
})
export class ApplicationModule {}
