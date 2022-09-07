import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutModule } from '@console/common/layout/layout.module';
import { ShareModule } from '@console/common/share.module';

import { AuthorizedComponent } from './authorized.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent
  }
];

@NgModule({
  imports: [ShareModule, LayoutModule, RouterModule.forChild(routes)],
  declarations: [AuthorizedComponent]
})
export class AuthorizedModule {}
