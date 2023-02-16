import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MonitorComponent } from './monitor.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: {
          breadcrumb: $localize`Sessions`
        }
      },
      {
        path: 'values',
        loadChildren: () => import('./values/values.module').then(m => m.ValuesModule),
        data: {
          breadcrumb: $localize`Values`
        }
      },
      { path: '', redirectTo: 'sessions', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MonitorComponent]
})
export class MonitorModule {}
