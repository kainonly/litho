import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

const routes: Routes = [
  {
    path: 'resource',
    loadChildren: () => import('./resource/resource.module').then(m => m.ResourceModule)
  },
  {
    path: 'role',
    loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '', redirectTo: '/settings/resource', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)]
})
export class SettingsModule {}
