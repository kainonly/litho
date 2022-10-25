import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';

import { DashboardComponent } from './dashboard.component';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'analysis',
        loadChildren: () => import('./analysis/analysis.module').then(m => m.AnalysisModule),
        data: {
          breadcrumb: '分析页'
        }
      },
      { path: '', redirectTo: 'analysis', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
