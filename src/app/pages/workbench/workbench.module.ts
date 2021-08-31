import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'message',
    component: MessageComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  { path: '', redirectTo: '/workbench/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [DashboardComponent, MessageComponent, ProfileComponent]
})
export class WorkbenchModule {}
