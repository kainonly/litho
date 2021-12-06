import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { AppsComponent } from './apps.component';

const routes: Routes = [
  {
    path: '',
    component: AppsComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [AppsComponent]
})
export class AppsModule {}
