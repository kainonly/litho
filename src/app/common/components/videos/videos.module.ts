import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { VideosInputComponent } from './videos-input.component';
import { VideosComponent } from './videos.component';

@NgModule({
  imports: [ShareModule],
  declarations: [VideosComponent, VideosInputComponent, FormComponent, TagFormComponent],
  exports: [VideosComponent, VideosInputComponent, FormComponent, TagFormComponent]
})
export class VideosModule {}
