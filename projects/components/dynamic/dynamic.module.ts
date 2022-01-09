import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxTableModule } from '@weplanx/components/table';

import { WpxDynamicComponent } from './dynamic.component';
import { DynamicService } from './dynamic.service';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule, PortalModule],
  declarations: [WpxDynamicComponent, TableComponent],
  exports: [WpxDynamicComponent],
  providers: [DynamicService]
})
export class WpxDynamicModule {}
