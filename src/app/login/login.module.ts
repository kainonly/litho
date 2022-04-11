import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { StageModule } from '@common/stage/stage.module';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [ShareModule, StageModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent]
})
export class LoginModule {}
