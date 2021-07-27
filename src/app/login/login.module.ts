import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent]
})
export class LoginModule {}
