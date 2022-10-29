import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';
import { OrgsComponent } from '@orgs/orgs.component';

const routes: Routes = [
  {
    path: '',
    component: OrgsComponent,
    children: [
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
        data: {
          breadcrumb: '权限组'
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: {
          breadcrumb: '团队成员'
        }
      },
      { path: '', redirectTo: 'roles', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [OrgsComponent]
})
export class OrgsModule {}
