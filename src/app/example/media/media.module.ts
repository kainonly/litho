import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxMediaModule } from '@weplanx/components/media';
import { WpxTransportModule } from '@weplanx/components/transport';

import { MediaComponent } from './media.component';

const routes: Routes = [
  {
    path: '',
    component: MediaComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxTransportModule, WpxMediaModule, RouterModule.forChild(routes)],
  declarations: [MediaComponent]
})
export class MediaModule {}
