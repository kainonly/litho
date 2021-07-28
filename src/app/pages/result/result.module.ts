import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { FailComponent } from './fail/fail.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: 'fail',
    component: FailComponent
  },
  { path: '', redirectTo: '/result/success', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [SuccessComponent, FailComponent]
})
export class ResultModule {}
