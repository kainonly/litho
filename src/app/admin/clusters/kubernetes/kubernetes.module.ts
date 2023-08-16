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
        path: ':id/overview',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
        data: {
          breadcrumb: $localize`总览`
        }
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [KubernetesComponent, FormComponent]
})
export class KubernetesModule {}
