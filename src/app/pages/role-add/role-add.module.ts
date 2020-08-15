import { NgModule } from '@angular/core';
import { RoleAddComponent } from './role-add.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: RoleAddComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RoleAddComponent]
})
export class RoleAddModule {
}
