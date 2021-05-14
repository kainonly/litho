import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { LayoutComponent, LayoutModule } from '@vanx/framework/layout';
import { MainModule, IRoutes } from './skeleton/main.module';
import { CmsModule, CmsRoutes } from './skeleton/cms.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'empty',
        loadChildren: () => import('./pages/empty/empty.module').then(m => m.EmptyModule)
      },
      ...IRoutes,
      ...CmsRoutes,
      {
        path: 'cms-example',
        loadChildren: () => import('./pages/cms-example/cms-example.module').then(m => m.CmsExampleModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    AppExtModule,
    LayoutModule,
    MainModule,
    CmsModule,
    RouterModule.forChild(routes)
  ]
})
export class AppRouterModule {
}
