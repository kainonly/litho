import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { NotificationComponent } from './notification.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [NotificationComponent]
})
export class NotificationModule {}
