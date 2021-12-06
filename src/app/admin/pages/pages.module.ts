import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { PagesComponent } from './pages.component';
import { PagesSerivce } from './pages.serivce';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent
  }
];

@NgModule({
  imports: [AppShareModule, NzTreeModule, RouterModule.forChild(routes)],
  declarations: [PagesComponent],
  providers: [PagesSerivce]
})
export class PagesModule {}
