import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { FormComponent } from './form/form.component';
import { WpxTagsComponent } from './tags.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [WpxTagsComponent, FormComponent],
  exports: [WpxTagsComponent]
})
export class WpxTagsModule {}
