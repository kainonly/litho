import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AccessLogsService } from './access-logs.service';
import { AuditComponent } from './audit.component';

const routes: Routes = [
  {
    path: '',
    component: AuditComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [AuditComponent],
  providers: [AccessLogsService]
})
export class AuditModule {}
