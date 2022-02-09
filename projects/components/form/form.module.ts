import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxMediaModule } from '@weplanx/components/media';

import { WpxFormComponent } from './form.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxMediaModule],
  declarations: [WpxFormComponent],
  exports: [WpxFormComponent]
})
export class WpxFormModule {}
