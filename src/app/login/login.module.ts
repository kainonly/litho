import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { TranslationModule } from '@common/translation/translation.module';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [ShareModule, TranslationModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent]
})
export class LoginModule {}
