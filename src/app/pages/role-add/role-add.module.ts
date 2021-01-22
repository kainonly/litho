import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { RoleAddComponent, RoleModule } from 'van-skeleton/role';

const routes: Routes = [
  {
    path: '',
    component: RoleAddComponent
  }
];

@NgModule({
  imports: [
    RoleModule,
    AppExtModule,
    RouterModule.forChild(routes)
  ]
})
export class RoleAddModule {
}
