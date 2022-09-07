import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutModule } from '@console/common/layout/layout.module';
import { ShareModule } from '@console/common/share.module';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [ShareModule, LayoutModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent]
})
export class LoginModule {}
