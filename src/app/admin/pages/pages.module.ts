import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { ProjectsSerivce } from '../projects/projects.serivce';
import { FormComponent } from './form/form.component';
import { PagesComponent } from './pages.component';
import { PagesSerivce } from './pages.serivce';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent
  }
];

@NgModule({
  imports: [AppShareModule, NzTreeModule, NzTreeSelectModule, RouterModule.forChild(routes)],
  declarations: [PagesComponent, FormComponent],
  providers: [PagesSerivce, ProjectsSerivce]
})
export class PagesModule {}
