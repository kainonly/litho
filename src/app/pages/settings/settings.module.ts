import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { FactoryComponent } from './factory/factory.component';
import { PermissionComponent } from './permission/permission.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'permission',
    component: PermissionComponent
  },
  {
    path: 'factory',
    component: FactoryComponent
  },
  { path: '', redirectTo: '/settings/team', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [TeamComponent, PermissionComponent, FactoryComponent]
})
export class SettingsModule {}
