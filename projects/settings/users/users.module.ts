import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  imports: [WpxModule, WpxLayoutModule, WpxShareModule, RouterModule.forChild(routes)],
  declarations: [UsersComponent],
  providers: [UsersService]
})
export class UsersModule {}
