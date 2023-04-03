import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { PicturesComponent } from './pictures.component';

@NgModule({
  imports: [ShareModule],
  declarations: [PicturesComponent],
  exports: [PicturesComponent]
})
export class PicturesModule {}
