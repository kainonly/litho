import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { AdminIndexComponent, AdminModule } from 'van-skeleton/admin';

const routes: Routes = [
  {
    path: '',
    component: AdminIndexComponent
  }
];

@NgModule({
  imports: [
    AdminModule,
    AppExtModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminIndexModule {
}
