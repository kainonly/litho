import { NgModule } from '@angular/core';
import { ResourceIndexComponent } from './resource-index.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

const routes: Routes = [
  {
    path: '',
    component: ResourceIndexComponent
  }
];

@NgModule({
  imports: [AppExtModule, RouterModule.forChild(routes), NzPipesModule],
  declarations: [ResourceIndexComponent]
})
export class ResourceIndexModule {
}
