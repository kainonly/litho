import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxHeaderModule, WpxNavModule, WpxDynamicComponent, WpxDynamicModule } from '@weplanx/ng-intgr';

import { EmptyComponent } from './empty/empty.component';
import { ExampleModule } from './example/example.module';
import { PagesActivated } from './pages.activated';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivateChild: [PagesActivated],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: ':pageId',
        component: WpxDynamicComponent
      },
      { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, WpxHeaderModule, WpxNavModule, WpxDynamicModule, ExampleModule, RouterModule.forChild(routes)],
  declarations: [PagesComponent, EmptyComponent],
  providers: [PagesActivated]
})
export class PagesModule {}
