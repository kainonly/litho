import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { CoreModule, CoreRoutes } from './skeleton/core.module';
import { CmsModule, CmsRoutes } from './skeleton/cms.module';
import { DashboardsComponent, DashboardsModule } from 'van-skeleton/dashboards';

const routes: Routes = [
  {
    path: '',
    component: DashboardsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'empty',
        loadChildren: () => import('./pages/empty/empty.module').then(m => m.EmptyModule)
      },
      ...CoreRoutes,
      ...CmsRoutes
    ]
  }
];

@NgModule({
  imports: [
    AppExtModule,
    DashboardsModule,
    CoreModule,
    CmsModule,
    RouterModule.forChild(routes)
  ]
})
export class AppRouterModule {
}
