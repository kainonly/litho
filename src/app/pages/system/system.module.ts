import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { AclComponent } from './acl/acl.component';
import { AclService } from './acl/acl.service';
import { AdminComponent } from './admin/admin.component';
import { ResourceComponent } from './resource/resource.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {
    path: 'acl',
    component: AclComponent
  },
  {
    path: 'resource',
    component: ResourceComponent
  },
  {
    path: 'role',
    component: RoleComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  { path: '', redirectTo: '/system/acl', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [AclComponent, ResourceComponent, RoleComponent, AdminComponent],
  providers: [AclService]
})
export class SystemModule {}
