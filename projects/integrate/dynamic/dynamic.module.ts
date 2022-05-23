import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { DynamicComponent } from './dynamic.component';
import { DynamicService } from './dynamic.service';
import { FormModule } from './form/form.module';
import { TableModule } from './table/table.module';

@NgModule({
  imports: [WpxModule, WpxShareModule, PortalModule, TableModule, FormModule],
  declarations: [DynamicComponent],
  exports: [DynamicComponent],
  providers: [DynamicService]
})
export class DynamicModule {}
