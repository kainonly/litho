import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { RoleComponent } from './role.component';
import { RoleService } from './role.service';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [RoleComponent],
  providers: [RoleService]
})
export class RoleModule {}
