import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlankLayoutModule } from '@common/components/blank-layout/blank-layout.module';
import { TranslationModule } from '@common/components/translation/translation.module';
import { ShareModule } from '@common/share.module';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [ShareModule, TranslationModule, RouterModule.forChild(routes), BlankLayoutModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
