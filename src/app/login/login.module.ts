import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicComponent } from './basic/basic.component';
import { LoginComponent } from './login.component';
import { SmsComponent } from './sms/sms.component';
import { TotpComponent } from './totp/totp.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'basic',
        component: BasicComponent
      },
      {
        path: 'totp',
        component: TotpComponent
      },
      {
        path: 'sms',
        component: SmsComponent
      },
      { path: '', redirectTo: 'basic', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class LoginModule {}
