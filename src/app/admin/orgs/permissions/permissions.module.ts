import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
        data: {
          breadcrumb: $localize`角色`
        }
      }
    ],
    data: {
      breadcrumb: $localize`权限`
    }
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class PermissionsModule {}
