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
        path: 'plugins',
        loadChildren: () => import('./plugins/plugins.module').then(m => m.PluginsModule),
        data: {
          breadcrumb: '插件'
        }
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.MediaModule),
        data: {
          breadcrumb: '媒体'
        }
      },
      {
        path: 'blocks',
        loadChildren: () => import('./blocks/blocks.module').then(m => m.BlocksModule),
        data: {
          breadcrumb: '引擎'
        }
      },
      { path: '', redirectTo: 'plugins', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ExperimentComponent]
})
export class ExperimentModule {}
