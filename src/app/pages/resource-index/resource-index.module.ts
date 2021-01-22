import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { ResourceIndexComponent, ResourceModule } from 'van-skeleton/resource';

const routes: Routes = [
  {
    path: '',
    component: ResourceIndexComponent
  }
];

@NgModule({
  imports: [
    ResourceModule,
    AppExtModule,
    RouterModule.forChild(routes)
  ]
})
export class ResourceIndexModule {
}
