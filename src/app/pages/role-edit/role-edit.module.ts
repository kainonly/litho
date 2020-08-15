import { NgModule } from '@angular/core';
import { RoleEditComponent } from './role-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: RoleEditComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RoleEditComponent]
})
export class RoleEditModule {
}
