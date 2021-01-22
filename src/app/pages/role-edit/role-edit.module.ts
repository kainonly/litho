import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { RoleEditComponent, RoleModule } from 'van-skeleton/role';

const routes: Routes = [
  {
    path: '',
    component: RoleEditComponent
  }
];

@NgModule({
  imports: [
    RoleModule,
    AppExtModule,
    RouterModule.forChild(routes)
  ]
})
export class RoleEditModule {
}
