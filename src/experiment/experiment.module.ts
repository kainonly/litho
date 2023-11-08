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
          breadcrumb: `Indexed DB`
        }
      },
      {
        path: 'table',
        loadChildren: () => import('./table/table.module').then(m => m.TableModule),
        data: {
          breadcrumb: `Table`
        }
      },
      {
        path: 'upload',
        loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule),
        data: {
          breadcrumb: `Upload`
        }
      },
      {
        path: 'article',
        loadChildren: () => import('./article/article.module').then(m => m.ArticleModule),
        data: {
          breadcrumb: `Article`
        }
      },
      {
        path: 'code-editor',
        loadChildren: () => import('./code-editor/code-editor.module').then(m => m.CodeEditorModule),
        data: {
          breadcrumb: `Code Editor`
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
