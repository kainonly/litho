import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { SmsComponent } from './sms.component';

const routes: Routes = [
  {
    path: '',
    component: SmsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [SmsComponent]
})
export class SmsModule {}
