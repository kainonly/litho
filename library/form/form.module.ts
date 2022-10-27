import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxCheckboxModule } from '@weplanx/ng/checkbox';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxRichtextModule } from '@weplanx/ng/richtext';

import { WpxFormComponent } from './form.component';

@NgModule({
  imports: [WpxShareModule, WpxModule, WpxCheckboxModule, WpxMediaModule, WpxRichtextModule, PortalModule],
  declarations: [WpxFormComponent],
  exports: [WpxFormComponent]
})
export class WpxFormModule {}
