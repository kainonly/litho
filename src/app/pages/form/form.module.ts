import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { BasicComponent } from './basic/basic.component';

const routes: Routes = [
  {
    path: 'basic',
    component: BasicComponent
  },
  { path: '', redirectTo: '/form/basic', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [BasicComponent]
})
export class FormModule {}
