import { NgModule } from '@angular/core';
import { RoleIndexComponent } from './role-index.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: RoleIndexComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RoleIndexComponent]
})
export class RoleIndexModule {
}
