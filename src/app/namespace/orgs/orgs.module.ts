import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
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
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class OrgsModule {}
