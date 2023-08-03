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
        path: 'store',
        loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
        data: {
          breadcrumb: `本地存储`
        }
      },
      {
        path: 'table',
        loadChildren: () => import('./table/table.module').then(m => m.TableModule),
        data: {
          breadcrumb: `表格`
        }
      },
      {
        path: 'upload',
        loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule),
        data: {
          breadcrumb: `上传`
        }
      },
      {
        path: 'article',
        loadChildren: () => import('./article/article.module').then(m => m.ArticleModule),
        data: {
          breadcrumb: `文章`
        }
      },
      { path: '', redirectTo: 'store', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, NavModule, RouterModule.forChild(routes)],
  declarations: [ExperimentComponent]
})
export class ExperimentModule {}
