import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { LoginedComponent } from './logined.component';

const routes: Routes = [
  {
    path: '',
    component: LoginedComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [LoginedComponent]
})
export class LoginedModule {}
