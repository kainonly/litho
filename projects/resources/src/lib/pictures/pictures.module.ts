import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { PicturesComponent } from './pictures.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [PicturesComponent]
})
export class PicturesModule {}
