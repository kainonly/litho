import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { LayoutComponent, LayoutModule } from '@vanx/framework/layout';
import { MainModule, IRoutes } from './skeleton/main.module';

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
      ...IRoutes
    ]
  }
];

@NgModule({
  imports: [
    AppExtModule,
    LayoutModule,
    MainModule,
    RouterModule.forChild(routes)
  ]
})
export class AppRouterModule {
}
