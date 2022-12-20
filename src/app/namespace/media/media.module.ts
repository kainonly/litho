import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';

import { MediaComponent } from './media.component';

const routes: Routes = [
  {
    path: '',
    component: MediaComponent,
    children: [
      {
        path: 'storage',
        loadChildren: () => import('./storage/storage.module').then(m => m.StorageModule),
        data: {
          breadcrumb: '存储介质'
        }
      },
      {
        path: 'pictures',
        loadChildren: () => import('./pictures/pictures.module').then(m => m.PicturesModule),
        data: {
          breadcrumb: '图片'
        }
      },
      {
        path: 'videos',
        loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule),
        data: {
          breadcrumb: '视频'
        }
      },
      { path: '', redirectTo: 'pictures', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [MediaComponent]
})
export class MediaModule {}
