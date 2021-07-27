import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { IndexComponent } from './index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [IndexComponent]
})
export class IndexModule {}
