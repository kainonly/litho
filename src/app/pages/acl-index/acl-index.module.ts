import { NgModule } from '@angular/core';
import { AclIndexComponent } from './acl-index.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: AclIndexComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AclIndexComponent]
})
export class AclIndexModule {
}
