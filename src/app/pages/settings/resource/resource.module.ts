import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { ResourceComponent } from './resource.component';
import { ResourceService } from './resource.service';

const routes: Routes = [
  {
    path: '',
    component: ResourceComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [ResourceComponent],
  providers: [ResourceService]
})
export class ResourceModule {}
