import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';

import { WpxUsersComponent } from './wpx-users.component';
import { WpxUsersService } from './wpx-users.service';

const routes: Routes = [
  {
    path: '',
    component: WpxUsersComponent
  }
];

@NgModule({
  imports: [WpxModule, WpxLayoutModule, WpxShareModule, RouterModule.forChild(routes)],
  declarations: [WpxUsersComponent],
  providers: [WpxUsersService]
})
export class WpxUsersModule {}
