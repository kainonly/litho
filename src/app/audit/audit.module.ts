import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavModule } from '@common/components/nav/nav.module';
import { ShareModule } from '@common/share.module';

import { AuditComponent } from './audit.component';

const routes: Routes = [
  {
    path: '',
    component: AuditComponent,
    children: [
      {
        path: 'logined',
        loadChildren: () => import('./logins/logins.module').then(m => m.LoginsModule),
        data: {
          breadcrumb: $localize`登录`
        }
      },
      {
        path: 'operates',
        loadChildren: () => import('./operates/operates.module').then(m => m.OperatesModule),
        data: {
          breadcrumb: $localize`操作`
        }
      },
      { path: '', redirectTo: 'logined', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, NavModule, RouterModule.forChild(routes)],
  declarations: [AuditComponent]
})
export class AuditModule {}
