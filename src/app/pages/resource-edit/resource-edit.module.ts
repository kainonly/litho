import { NgModule } from '@angular/core';
import { ResourceEditComponent } from './resource-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: ResourceEditComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResourceEditComponent]
})
export class ResourceEditModule {
}
