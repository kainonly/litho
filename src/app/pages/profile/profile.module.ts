import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { AdvancedComponent } from './advanced/advanced.component';
import { BasicComponent } from './basic/basic.component';

const routes: Routes = [
  {
    path: 'basic',
    component: BasicComponent
  },
  {
    path: 'advanced',
    component: AdvancedComponent
  },
  { path: '', redirectTo: '/profile/basic', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [BasicComponent, AdvancedComponent]
})
export class ProfileModule {}
