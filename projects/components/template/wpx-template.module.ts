import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { WpxCommonModule, WpxModule } from '@weplanx/components';

import { CommonService } from './common.service';
import { WpxTemplateTableComponent } from './wpx-template-table/wpx-template-table.component';
import { WpxTemplateComponent } from './wpx-template.component';

@NgModule({
  imports: [WpxModule, WpxCommonModule, PortalModule],
  declarations: [WpxTemplateComponent, WpxTemplateTableComponent],
  exports: [WpxTemplateComponent, WpxTemplateTableComponent],
  providers: [CommonService]
})
export class WpxTemplateModule {}
