import { NgModule } from '@angular/core';
import { AdminEditComponent } from './admin-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: AdminEditComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminEditComponent]
})
export class AdminEditModule {
}
