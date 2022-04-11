import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxHeaderModule } from '@weplanx/components/header';
import { WpxNavModule } from '@weplanx/components/nav';

import { factory, FactoryModule } from './factory/factory.module';
import { media, MediaModule } from './media/media.module';
import { ResourcesComponent } from './resources.component';

const routes: Routes = [
  {
    path: '',
    component: ResourcesComponent,
    children: [
      {
        path: 'factory',
        children: factory,
        data: {
          breadcrumb: '内容生成器'
        }
      },
      {
        path: 'media',
        children: media,
        data: {
          breadcrumb: '媒体资源'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    WpxModule,
    WpxShareModule,
    WpxHeaderModule,
    WpxNavModule,
    FactoryModule,
    MediaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResourcesComponent]
})
export class ResourcesModule {}
