import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { WpxFormComponent } from './form.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [WpxFormComponent],
  exports: [WpxFormComponent]
})
export class WpxFormModule {}
