import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AclIndexComponent, AclModule } from 'van-skeleton/acl';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: AclIndexComponent
  }
];

@NgModule({
  imports: [
    AclModule,
    AppExtModule,
    RouterModule.forChild(routes)
  ]
})
export class AclIndexModule {
}
