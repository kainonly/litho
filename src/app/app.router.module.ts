import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { DashboardsComponent } from './dashboards/dashboards.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: '{empty}',
        loadChildren: () => import('./pages/empty/empty.module').then(m => m.EmptyModule)
      },
      {
        path: '{profile}',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: '{acl-index}',
        loadChildren: () => import('./pages/acl-index/acl-index.module').then(m => m.AclIndexModule)
      },
      {
        path: '{acl-add}',
        loadChildren: () => import('./pages/acl-add/acl-add.module').then(m => m.AclAddModule)
      },
      {
        path: '{acl-edit}/:id',
        loadChildren: () => import('./pages/acl-edit/acl-edit.module').then(m => m.AclEditModule)
      },
      {
        path: '{resource-index}',
        loadChildren: () => import('./pages/resource-index/resource-index.module').then(m => m.ResourceIndexModule)
      },
      {
        path: '{resource-add}',
        loadChildren: () => import('./pages/resource-add/resource-add.module').then(m => m.ResourceAddModule)
      },
      {
        path: '{resource-edit}/:id',
        loadChildren: () => import('./pages/resource-edit/resource-edit.module').then(m => m.ResourceEditModule)
      },
      {
        path: '{role-index}',
        loadChildren: () => import('./pages/role-index/role-index.module').then(m => m.RoleIndexModule)
      },
      {
        path: '{role-add}',
        loadChildren: () => import('./pages/role-add/role-add.module').then(m => m.RoleAddModule)
      },
      {
        path: '{role-edit}/:id',
        loadChildren: () => import('./pages/role-edit/role-edit.module').then(m => m.RoleEditModule)
      },
      {
        path: '{admin-index}',
        loadChildren: () => import('./pages/admin-index/admin-index.module').then(m => m.AdminIndexModule)
      },
      {
        path: '{admin-add}',
        loadChildren: () => import('./pages/admin-add/admin-add.module').then(m => m.AdminAddModule)
      },
      {
        path: '{admin-edit}/:id',
        loadChildren: () => import('./pages/admin-edit/admin-edit.module').then(m => m.AdminEditModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardsComponent
  ]
})
export class AppRouterModule {
}
