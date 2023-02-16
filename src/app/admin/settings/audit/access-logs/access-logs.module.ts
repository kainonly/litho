import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AccessLogsComponent } from './access-logs.component';
import { AccessLogsService } from './access-logs.service';

const routes: Routes = [
  {
    path: '',
    component: AccessLogsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [AccessLogsComponent],
  providers: [AccessLogsService]
})
export class AccessLogsModule {}
