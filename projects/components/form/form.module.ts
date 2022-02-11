import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxCheckboxModule } from '@weplanx/components/checkbox';
import { WpxMediaModule } from '@weplanx/components/media';
import { WpxRichtextModule } from '@weplanx/components/richtext';

import { ApiService } from './api.service';
import { WpxFormComponent } from './form.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxMediaModule, WpxRichtextModule, WpxCheckboxModule],
  declarations: [WpxFormComponent],
  exports: [WpxFormComponent],
  providers: [ApiService]
})
export class WpxFormModule {}
