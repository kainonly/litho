import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { ActivitiesComponent } from './activities/activities.component';
import { BasicComponent } from './basic/basic.component';
import { CenterComponent } from './center.component';
import { LogsComponent } from './logs/logs.component';
import { SecurityComponent } from './security/security.component';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'logs',
        component: LogsComponent
      },
      {
        path: 'activities',
        component: ActivitiesComponent
      },
      {
        path: 'basic',
        component: BasicComponent
      },
      {
        path: 'security',
        component: SecurityComponent
      },
      { path: '', redirectTo: '/center/logs', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [CenterComponent, LogsComponent, ActivitiesComponent, BasicComponent, SecurityComponent]
})
export class CenterModule {}
