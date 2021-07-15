import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';
import { LayoutComponent, LayoutModule } from '@vanx/framework/layout';

import { CmsModule, CmsRoutes } from './skeleton/cms.module';
import { IRoutes, MainModule } from './skeleton/main.module';

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
  imports: [AppShareModule, LayoutModule, MainModule, CmsModule, RouterModule.forChild(routes)]
})
export class AppRoutingModule {}
