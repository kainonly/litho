import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'resource',
    loadChildren: () => import('./resource/resource.module').then(m => m.ResourceModule)
  },
  { path: '', redirectTo: '/settings/team', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [TeamComponent]
})
export class SettingsModule {}
