import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { ForbiddenComponent } from './forbidden.component';
import { NotFoundComponent } from './not-found.component';
import { UnavailableComponent } from './unavailable.component';

const routes: Routes = [
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '500',
    component: UnavailableComponent
  },
  { path: '', redirectTo: '/exception/403', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [ForbiddenComponent, NotFoundComponent, UnavailableComponent]
})
export class ExceptionModule {}
