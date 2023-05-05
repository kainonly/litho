import { NgModule } from '@angular/core';

import { TagsComponent } from '@common/components/videos/tags/tags.component';
import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { VideosInputComponent } from './videos-input.component';
import { VideosComponent } from './videos.component';

@NgModule({
  imports: [ShareModule],
  declarations: [VideosComponent, VideosInputComponent, FormComponent, TagsComponent, TagFormComponent],
  exports: [VideosComponent, VideosInputComponent]
})
export class VideosModule {}
