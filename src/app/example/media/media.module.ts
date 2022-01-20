import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxMediaModule } from '@weplanx/components/media';
import { WpxUploadModule } from '@weplanx/components/upload';

import { MediaComponent } from './media.component';

const routes: Routes = [
  {
    path: '',
    component: MediaComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxUploadModule, WpxMediaModule, RouterModule.forChild(routes)],
  declarations: [MediaComponent]
})
export class MediaModule {}
