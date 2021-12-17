import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [UsersComponent],
  providers: [UsersService]
})
export class UsersModule {}
