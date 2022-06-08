import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxCheckboxModule } from '@weplanx/ng/checkbox';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxRichtextModule } from '@weplanx/ng/richtext';

import { ApiService } from './api.service';
import { WpxFormComponent } from './form.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxMediaModule, WpxRichtextModule, WpxCheckboxModule, PortalModule],
  declarations: [WpxFormComponent],
  exports: [WpxFormComponent],
  providers: [ApiService]
})
export class WpxFormModule {}
