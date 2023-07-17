import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavModule } from '@common/components/nav/nav.module';
import { ShareModule } from '@common/share.module';

import { ExperimentComponent } from './experiment.component';

const routes: Routes = [
  {
    path: '',
    component: ExperimentComponent,
    children: [
      {
        path: 'table',
        loadChildren: () => import('./table/table.module').then(m => m.TableModule),
        data: {
          breadcrumb: `表格`
        }
      },
      { path: '', redirectTo: 'table', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, NavModule, RouterModule.forChild(routes)],
  declarations: [ExperimentComponent]
})
export class ExperimentModule {}
