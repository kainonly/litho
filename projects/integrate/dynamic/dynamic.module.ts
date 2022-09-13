import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { WpxDynamicComponent } from './dynamic.component';
import { WpxDynamicService } from './dynamic.service';
import { FormModule } from './form/form.module';
import { TableModule } from './table/table.module';

@NgModule({
  imports: [WpxModule, WpxShareModule, PortalModule, TableModule, FormModule],
  declarations: [WpxDynamicComponent],
  exports: [WpxDynamicComponent],
  providers: [WpxDynamicService]
})
export class WpxDynamicModule {}
