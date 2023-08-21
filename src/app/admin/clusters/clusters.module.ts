import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ClustersComponent } from './clusters.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: 'all',
    component: ClustersComponent,
    data: {
      breadcrumb: $localize`列表`
    }
  },
  {
    path: ':id',
    component: ClustersComponent,
    children: [
      {
        path: 'nodes',
        loadChildren: () => import('./nodes/nodes.module').then(m => m.NodesModule),
        data: {
          breadcrumb: $localize`节点`
        }
      },
      {
        path: 'ingresses',
        loadChildren: () => import('./ingresses/ingresses.module').then(m => m.IngressesModule),
        data: {
          breadcrumb: `Ingresses`
        }
      },
      { path: '', redirectTo: 'nodes', pathMatch: 'full' }
    ],
    data: {
      breadcrumb: $localize`上下文`
    }
  },
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ClustersComponent, FormComponent]
})
export class ClustersModule {}
