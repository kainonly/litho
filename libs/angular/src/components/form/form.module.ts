import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { WpxShareModule } from '../../share.module';
import { WpxModule } from '../../wpx.module';
import { WpxCheckboxModule } from '../checkbox/checkbox.module';
import { WpxMediaModule } from '../media/media.module';
import { WpxRichtextModule } from '../richtext/richtext.module';
import { WpxFormComponent } from './form.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxMediaModule, WpxRichtextModule, WpxCheckboxModule, PortalModule],
  declarations: [WpxFormComponent],
  exports: [WpxFormComponent]
})
export class WpxFormModule {}
