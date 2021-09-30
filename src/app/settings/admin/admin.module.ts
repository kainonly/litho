import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent],
  providers: [AdminService]
})
export class AdminModule {}
