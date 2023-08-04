import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AvailableConnectionsComponent } from './mongo/available-connections.component';
import { CommandPerSecondComponent } from './mongo/command-per-second.component';
import { DocumentOperationsComponent } from './mongo/document-operations.component';
import { FlushesComponent } from './mongo/flushes.component';
import { NetworkIoComponent } from './mongo/network-io.component';
import { OpenConnectionsComponent } from './mongo/open-connections.component';
import { QueryOperationsComponent } from './mongo/query-operations.component';
import { ObservabilityComponent } from './observability.component';
import { ObservabilityService } from './observability.service';

const routes: Routes = [
  {
    path: ':type',
    component: ObservabilityComponent
  },
  { path: '', redirectTo: 'apm', pathMatch: 'full' }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [
    ObservabilityComponent,
    AvailableConnectionsComponent,
    CommandPerSecondComponent,
    DocumentOperationsComponent,
    FlushesComponent,
    NetworkIoComponent,
    OpenConnectionsComponent,
    QueryOperationsComponent
  ],
  providers: [ObservabilityService]
})
export class ObservabilityModule {}
