import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [UsersComponent],
  providers: [UsersService]
})
export class UsersModule {}
