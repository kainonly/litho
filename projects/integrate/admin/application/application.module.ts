import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { FactoryComponent } from './factory/factory.component';
import { FactoryModule, factory } from './factory/factory.module';
import { FunctionComponent } from './function/function.component';
import { FunctionModule } from './function/function.module';
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
    path: 'function',
    component: FunctionComponent,
    data: {
      breadcrumb: '功能模块'
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
  imports: [WpxShareModule, WpxModule, FactoryModule, FunctionModule, PicturesModule, VideosModule]
})
export class ApplicationModule {}
