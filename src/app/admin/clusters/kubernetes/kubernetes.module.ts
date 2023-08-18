import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { KubernetesComponent } from './kubernetes.component';

const routes: Routes = [
  {
    path: '',
    component: KubernetesComponent,
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
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [KubernetesComponent, FormComponent]
})
export class KubernetesModule {}
