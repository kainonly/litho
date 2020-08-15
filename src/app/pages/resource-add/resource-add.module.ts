import { NgModule } from '@angular/core';
import { ResourceAddComponent } from './resource-add.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: ResourceAddComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResourceAddComponent]
})
export class ResourceAddModule {
}
