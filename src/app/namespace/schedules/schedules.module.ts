import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';

import { SchedulesComponent } from './schedules.component';
import { SchedulesService } from './schedules.service';

const routes: Routes = [
  {
    path: '',
    component: SchedulesComponent,
    children: [
      {
        path: 'timing',
        loadChildren: () => import('./timing/timing.module').then(m => m.TimingModule),
        data: {
          breadcrumb: '定时回调'
        }
      },
      { path: '', redirectTo: 'timing', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [SchedulesComponent],
  providers: [SchedulesService]
})
export class SchedulesModule {}
