import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { LayoutComponent } from './pages/layout/layout.component';
import { LayoutModule } from './pages/layout/layout.module';

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
      }
    ]
  }
];

@NgModule({
  imports: [AppShareModule, LayoutModule, RouterModule.forChild(routes)]
})
export class AppRoutingModule {}
