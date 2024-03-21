import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { SessionsComponent } from './sessions/sessions.component';
import { ValuesComponent } from './values/values.component';
import { SettingComponent } from '../acc-tasks/setting/setting.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'security',
        component: SettingComponent,
        data: {
          breadcrumb: `Security`
        }
      },
      {
        path: 'sessions',
        component: SessionsComponent,
        data: {
          breadcrumb: `Sessions`
        }
      },
      {
        path: 'values',
        component: ValuesComponent,
        data: {
          breadcrumb: `Dynamic Values`
        }
      },
      { path: '', redirectTo: 'security', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class SettingsModule {}
