import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cloud',
        loadChildren: () => import('./cloud/cloud.module').then(m => m.CloudModule),
        data: {
          breadcrumb: `Public Cloud`
        }
      },
      {
        path: 'collaboration',
        loadChildren: () => import('./collaboration/collaboration.module').then(m => m.CollaborationModule),
        data: {
          breadcrumb: `Collaboration`
        }
      },
      {
        path: 'extend',
        loadChildren: () => import('./extend/extend.module').then(m => m.ExtendModule),
        data: {
          breadcrumb: `Extend`
        }
      },
      { path: '', redirectTo: 'cloud', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class IntegratedModule {}
