import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ExperimentComponent } from './experiment.component';

const routes: Routes = [
  {
    path: '',
    component: ExperimentComponent,
    children: [
      {
        path: 'resources',
        loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesModule),
        data: {
          breadcrumb: '资源'
        }
      },
      {
        path: 'plugins',
        loadChildren: () => import('./plugins/plugins.module').then(m => m.PluginsModule),
        data: {
          breadcrumb: '插件'
        }
      },
      {
        path: 'engine',
        loadChildren: () => import('./engine/engine.module').then(m => m.EngineModule),
        data: {
          breadcrumb: '引擎'
        }
      },
      { path: '', redirectTo: 'resources', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ExperimentComponent]
})
export class ExperimentModule {}
