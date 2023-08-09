import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { TotpComponent } from './totp.component';

const routes: Routes = [
  {
    path: '',
    component: TotpComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [TotpComponent]
})
export class TotpModule {}
