import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { RoleIndexComponent, RoleModule } from 'van-skeleton/role';

const routes: Routes = [
  {
    path: '',
    component: RoleIndexComponent
  }
];

@NgModule({
  imports: [
    RoleModule,
    AppExtModule,
    RouterModule.forChild(routes)
  ]
})
export class RoleIndexModule {
}
