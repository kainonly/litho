import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { RolesComponent } from './roles.component';
import { RolesService } from './roles.service';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [RolesComponent],
  providers: [RolesService]
})
export class RolesModule {}
