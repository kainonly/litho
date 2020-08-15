import { NgModule } from '@angular/core';
import { AdminAddComponent } from './admin-add.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: AdminAddComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminAddComponent]
})
export class AdminAddModule {
}
