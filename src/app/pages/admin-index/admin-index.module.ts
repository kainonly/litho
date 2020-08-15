import { NgModule } from '@angular/core';
import { AdminIndexComponent } from './admin-index.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: AdminIndexComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminIndexComponent]
})
export class AdminIndexModule {
}
