import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxCheckboxModule } from '@weplanx/components/checkbox';
import { WpxMediaModule } from '@weplanx/components/media';

import { WpxFormComponent } from './form.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxMediaModule, WpxCheckboxModule],
  declarations: [WpxFormComponent],
  exports: [WpxFormComponent]
})
export class WpxFormModule {}
