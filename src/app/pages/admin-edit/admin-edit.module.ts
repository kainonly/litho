import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { AdminEditComponent, AdminModule } from 'van-skeleton/admin';

const routes: Routes = [
  {
    path: '',
    component: AdminEditComponent
  }
];

@NgModule({
  imports: [
    AdminModule,
    AppExtModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminEditModule {
}
