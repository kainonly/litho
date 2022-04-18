import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { FormModule } from './form/form.module';
import { WpxPagesComponent } from './pages.component';
import { PagesService } from './pages.service';
import { TableModule } from './table/table.module';

@NgModule({
  imports: [WpxModule, WpxShareModule, PortalModule, TableModule, FormModule],
  declarations: [WpxPagesComponent],
  exports: [WpxPagesComponent],
  providers: [PagesService]
})
export class WpxPagesModule {}
