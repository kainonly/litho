import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';

import { MediaComponent } from './media.component';

const routes: Routes = [
  {
    path: '',
    component: MediaComponent,
    children: [
      {
        path: 'pictures',
        loadChildren: () => import('./pictures/pictures.module').then(m => m.PicturesModule),
        data: {
          breadcrumb: '图库'
        }
      },
      {
        path: 'videos',
        loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule),
        data: {
          breadcrumb: '视频'
        }
      },
      { path: '', redirectTo: '/media/pictures', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [MediaComponent]
})
export class MediaModule {}
