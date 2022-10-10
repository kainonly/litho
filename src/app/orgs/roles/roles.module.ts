import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { RolesComponent } from './roles.component';
import { RolesService } from './roles.service';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [RolesComponent, FormComponent],
  providers: [RolesService]
})
export class RolesModule {}
