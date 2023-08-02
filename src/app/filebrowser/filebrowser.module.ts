import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavModule } from '@common/components/nav/nav.module';
import { ShareModule } from '@common/share.module';

import { FilebrowserComponent } from './filebrowser.component';

const routes: Routes = [
  {
    path: '',
    component: FilebrowserComponent,
    children: [
      {
        path: 'pictures',
        loadChildren: () => import('./pictures/pictures.module').then(m => m.PicturesModule),
        data: {
          breadcrumb: $localize`图片`
        }
      },
      {
        path: 'videos',
        loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule),
        data: {
          breadcrumb: $localize`视频`
        }
      },
      { path: '', redirectTo: 'pictures', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes), NavModule],
  declarations: [FilebrowserComponent]
})
export class FilebrowserModule {}
