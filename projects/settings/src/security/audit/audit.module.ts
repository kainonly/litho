import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxTableModule } from '@weplanx/components/table';

import { AuditComponent } from './audit.component';
import { AuditService } from './audit.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule],
  declarations: [AuditComponent],
  providers: [AuditService]
})
export class AuditModule {}
