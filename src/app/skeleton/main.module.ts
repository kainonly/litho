import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ProfileComponent, ProfileModule } from '@vanx/framework/profile';
import { PermissionPageComponent, PermissionIndexComponent, PermissionModule } from '@vanx/framework/permission';
import { UserAddComponent, UserEditComponent, UserIndexComponent, UserModule } from '@vanx/framework/user';
import { LogsComponent, ActivitiesComponent, SecurityModule } from '@vanx/framework/security';
import { AclPageComponent, AclIndexComponent, AclModule } from '@vanx/framework/acl';
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
    component: AclPageComponent
  },
  {
    path: 'acl-edit/:id',
    component: AclPageComponent
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
    component: PermissionPageComponent
  },
  {
    path: 'permission-edit/:id',
    component: PermissionPageComponent
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
    component: UserIndexComponent
  },
  {
    path: 'admin-add',
    component: UserAddComponent
  },
  {
    path: 'admin-edit/:id',
    component: UserEditComponent
  },
  {
    path: 'logs',
    component: LogsComponent
  },
  {
    path: 'activities',
    component: ActivitiesComponent
  }
];

@NgModule({
  exports: [
    ProfileModule,
    AclModule,
    ResourceModule,
    PermissionModule,
    RoleModule,
    UserModule,
    SecurityModule
  ]
})
export class MainModule {
}
