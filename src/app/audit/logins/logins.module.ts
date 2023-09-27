import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { LoginsComponent } from './logins.component';

const routes: Routes = [
  {
    path: '',
    component: LoginsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [LoginsComponent]
})
export class LoginsModule {}
