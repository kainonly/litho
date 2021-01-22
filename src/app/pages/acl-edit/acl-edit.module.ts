import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AclEditComponent, AclModule } from 'van-skeleton/acl';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: AclEditComponent
  }
];

@NgModule({
  imports: [
    AclModule,
    AppExtModule,
    RouterModule.forChild(routes)
  ]
})
export class AclEditModule {
}
