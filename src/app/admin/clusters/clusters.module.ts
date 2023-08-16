import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'kubernetes',
        loadChildren: () => import('./kubernetes/kubernetes.module').then(m => m.KubernetesModule),
        data: {
          breadcrumb: `Kubernetes`
        }
      },
      { path: '', redirectTo: 'kubernetes', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class ClustersModule {}
