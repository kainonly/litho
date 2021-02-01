import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { PermissionAddComponent, PermissionModule } from 'van-skeleton/permission';

const routes: Routes = [
  {
    path: '',
    component: PermissionAddComponent
  }
];

@NgModule({
  imports: [
    PermissionModule,
    AppExtModule,
    RouterModule.forChild(routes)
  ]
})
export class PermissionAddModule {
}
