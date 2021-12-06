import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { AppsComponent } from './apps.component';
import { AppsSerivce } from './apps.serivce';

const routes: Routes = [
  {
    path: '',
    component: AppsComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [AppsComponent],
  providers: [AppsSerivce]
})
export class AppsModule {}
