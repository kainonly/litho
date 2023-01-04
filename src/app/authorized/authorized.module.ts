import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlankModule } from '@common/blank/blank.module';
import { ShareModule } from '@common/share.module';

import { AuthorizedComponent } from './authorized.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent
  }
];

@NgModule({
  imports: [ShareModule, BlankModule, RouterModule.forChild(routes)],
  declarations: [AuthorizedComponent]
})
export class AuthorizedModule {}
