import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxFilebrowserModule } from '@weplanx/ng/filebrowser';

import { VideosComponent } from './videos.component';

const routes: Routes = [
  {
    path: '',
    component: VideosComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxFilebrowserModule, RouterModule.forChild(routes)],
  declarations: [VideosComponent]
})
export class VideosModule {}
