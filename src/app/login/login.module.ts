import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlankModule } from '@common/blank/blank.module';
import { ShareModule } from '@common/share.module';

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
