import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { AuditComponent } from './audit.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [AuditComponent]
})
export class AuditModule {}
