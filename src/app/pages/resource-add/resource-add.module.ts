import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { ResourceAddComponent, ResourceModule } from 'van-skeleton/resource';

const routes: Routes = [
  {
    path: '',
    component: ResourceAddComponent
  }
];

@NgModule({
  imports: [
    ResourceModule,
    AppExtModule,
    RouterModule.forChild(routes)
  ]
})
export class ResourceAddModule {
}
