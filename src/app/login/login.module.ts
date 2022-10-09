import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { BlankModule } from '../blank/blank.module';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [ShareModule, BlankModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent]
})
export class LoginModule {}
