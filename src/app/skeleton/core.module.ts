import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ProfileComponent } from 'van-skeleton/skeleton';
import { AclAddComponent, AclEditComponent, AclIndexComponent, AclModule } from 'van-skeleton/acl';
import { ResourceAddComponent, ResourceEditComponent, ResourceIndexComponent, ResourceModule } from 'van-skeleton/resource';
import { PermissionAddComponent, PermissionEditComponent, PermissionIndexComponent, PermissionModule } from 'van-skeleton/permission';
import { RoleAddComponent, RoleEditComponent, RoleIndexComponent, RoleModule } from 'van-skeleton/role';
import { AdminAddComponent, AdminEditComponent, AdminIndexComponent, AdminModule } from 'van-skeleton/admin';
import { RequestLogComponent, LoginLogComponent, LogModule } from 'van-skeleton/log';

export const CoreRoutes: Routes = [
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
    AclModule,
    ResourceModule,
    PermissionModule,
    RoleModule,
    AdminModule,
    LogModule
  ]
})
export class CoreModule {
}
