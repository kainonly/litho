import { NgModule } from '@angular/core';

import { FormComponent } from '@common/components/pictures/form/form.component';
import { ShareModule } from '@common/share.module';

import { PicturesInputComponent } from './pictures-input.component';
import { PicturesComponent } from './pictures.component';

@NgModule({
  imports: [ShareModule],
  declarations: [PicturesComponent, PicturesInputComponent, FormComponent],
  exports: [PicturesComponent, PicturesInputComponent, FormComponent]
})
export class PicturesModule {}
