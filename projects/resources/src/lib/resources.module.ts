import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { media, MediaModule } from './media/media.module';
import { ResourcesComponent } from './resources.component';
import { third_party } from './third-party/third-party.module';

const routes: Routes = [
  {
    path: '',
    component: ResourcesComponent,
    children: [
      {
        path: 'media',
        children: media,
        data: {
          breadcrumb: '媒体资源'
        }
      },
      {
        path: 'third-party',
        children: third_party
      },
      { path: '', redirectTo: '/resources/media/pictures', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, MediaModule, RouterModule.forChild(routes)],
  declarations: [ResourcesComponent]
})
export class ResourcesModule {}
