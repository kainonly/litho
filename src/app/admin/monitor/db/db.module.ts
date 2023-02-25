import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AvailableConnectionsComponent } from './available-connections/available-connections.component';
import { CommandPerSecondComponent } from './commands-per-second/command-per-second.component';
import { DbComponent } from './db.component';
import { DocumentOperationsComponent } from './document-operations/document-operations.component';
import { FlushesComponent } from './flushes/flushes.component';
import { NetworkIoComponent } from './network-io/network-io.component';
import { OpenConnectionsComponent } from './open-connections/open-connections.component';
import { QueryOperationsComponent } from './query-operations/query-operations.component';

const routes: Routes = [
  {
    path: '',
    component: DbComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [
    DbComponent,
    AvailableConnectionsComponent,
    OpenConnectionsComponent,
    CommandPerSecondComponent,
    QueryOperationsComponent,
    DocumentOperationsComponent,
    FlushesComponent,
    NetworkIoComponent
  ]
})
export class DbModule {}
