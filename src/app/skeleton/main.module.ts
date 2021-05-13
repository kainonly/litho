import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ProfileComponent, ProfileModule } from '@vanx/framework/profile';
import { PermissionAddComponent, PermissionEditComponent, PermissionIndexComponent, PermissionModule } from '@vanx/framework/permission';
import { AdminAddComponent, AdminEditComponent, AdminIndexComponent, AdminModule } from '@vanx/framework/admin';
import { LoginLogComponent, LogModule, RequestLogComponent } from '@vanx/framework/log';
import { AclAddComponent, AclEditComponent, AclIndexComponent, AclModule } from '@vanx/framework/acl';
import { ResourceAddComponent, ResourceEditComponent, ResourceIndexComponent, ResourceModule } from '@vanx/framework/resource';
import { RoleAddComponent, RoleEditComponent, RoleIndexComponent, RoleModule } from '@vanx/framework/role';

export const IRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'acl-index',
    component: AclIndexComponent
  },
  {
    path: 'acl-add',
    component: AclAddComponent
  },
  {
    path: 'acl-edit/:id',
    component: AclEditComponent
  },
  {
    path: 'resource-index',
    component: ResourceIndexComponent
  },
  {
    path: 'resource-add',
    component: ResourceAddComponent
  },
  {
    path: 'resource-edit/:id',
    component: ResourceEditComponent
  },
  {
    path: 'permission-index',
    component: PermissionIndexComponent
  },
  {
    path: 'permission-add',
    component: PermissionAddComponent
  },
  {
    path: 'permission-edit/:id',
    component: PermissionEditComponent
  },
  {
    path: 'role-index',
    component: RoleIndexComponent
  },
  {
    path: 'role-add',
    component: RoleAddComponent
  },
  {
    path: 'role-edit/:id',
    component: RoleEditComponent
  },
  {
    path: 'admin-index',
    component: AdminIndexComponent
  },
  {
    path: 'admin-add',
    component: AdminAddComponent
  },
  {
    path: 'admin-edit/:id',
    component: AdminEditComponent
  },
  {
    path: 'request-log',
    component: RequestLogComponent
  },
  {
    path: 'login-log',
    component: LoginLogComponent
  }
];

@NgModule({
  exports: [
    ProfileModule,
    AclModule,
    ResourceModule,
    PermissionModule,
    RoleModule,
    AdminModule,
    LogModule
  ]
})
export class MainModule {
}
