import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { AclComponent } from './acl/acl.component';
import { AclService } from './acl/acl.service';
import { AdminComponent } from './admin/admin.component';
import { ResourceComponent } from './resource/resource.component';
import { RoleComponent } from './role/role.component';
import { SystemComponent } from './system.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
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
    ]
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [SystemComponent, AclComponent, ResourceComponent, RoleComponent, AdminComponent],
  providers: [AclService]
})
export class SystemModule {}
