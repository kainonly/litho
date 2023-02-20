import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { OrgsComponent } from './orgs.component';

const routes: Routes = [
  {
    path: '',
    component: OrgsComponent,
    children: [
      {
        path: 'users',
        children: [
          {
            path: 'developer',
            loadChildren: () => import('./developer/developer.module').then(m => m.DeveloperModule),
            data: {
              breadcrumb: $localize`开发者`
            }
          },
          { path: '', redirectTo: 'developer', pathMatch: 'full' }
        ],
        data: {
          breadcrumb: $localize`成员`
        }
      },
      {
        path: 'permissions',
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
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OrgsComponent]
})
export class OrgsModule {}
