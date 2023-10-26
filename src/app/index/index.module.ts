import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavModule } from '@common/components/nav/nav.module';
import { ShareModule } from '@common/share.module';

import { IndexComponent } from './index.component';
import { NotFoundComponent } from './not-found.component';
import { resolver } from './resolver';

const routes: Routes = [
  {
    path: ':namespace',
    component: IndexComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
        data: {
          breadcrumb: `项目概况`
        }
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ],
    resolve: {
      project: resolver
    }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ShareModule, NavModule, RouterModule.forChild(routes)],
  declarations: [IndexComponent, NotFoundComponent]
})
export class IndexModule {}
