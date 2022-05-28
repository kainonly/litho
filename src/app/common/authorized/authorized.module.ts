import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { StageModule } from '@common/stage/stage.module';

import { AuthorizedComponent } from './authorized.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent
  }
];

@NgModule({
  imports: [ShareModule, StageModule, RouterModule.forChild(routes)],
  declarations: [AuthorizedComponent]
})
export class AuthorizedModule {}
