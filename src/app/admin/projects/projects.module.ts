import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { FormComponent } from './form.component';
import { ProjectsComponent } from './projects.component';
import { ProjectsSerivce } from './projects.serivce';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [ProjectsComponent, FormComponent],
  providers: [ProjectsSerivce]
})
export class ProjectsModule {}
