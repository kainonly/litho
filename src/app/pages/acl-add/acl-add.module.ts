import { NgModule } from '@angular/core';
import { AclAddComponent } from './acl-add.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: AclAddComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AclAddComponent]
})
export class AclAddModule {
}
