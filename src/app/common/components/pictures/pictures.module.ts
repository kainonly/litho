import { NgModule } from '@angular/core';

import { FormComponent } from '@common/components/pictures/form/form.component';
import { TagFormComponent } from '@common/components/pictures/tag-form/tag-form.component';
import { TagsComponent } from '@common/components/pictures/tags/tags.component';
import { ShareModule } from '@common/share.module';

import { PicturesInputComponent } from './pictures-input.component';
import { PicturesComponent } from './pictures.component';

@NgModule({
  imports: [ShareModule],
  declarations: [PicturesComponent, PicturesInputComponent, FormComponent, TagsComponent, TagFormComponent],
  exports: [PicturesComponent, PicturesInputComponent]
})
export class PicturesModule {}
