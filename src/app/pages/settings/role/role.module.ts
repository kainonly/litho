import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { CreateComponent } from './create/create.component';
import { RoleComponent } from './role.component';
import { RoleService } from './role.service';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent
  },
  {
    path: 'create',
    component: CreateComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [RoleComponent, CreateComponent],
  providers: [RoleService]
})
export class RoleModule {}
