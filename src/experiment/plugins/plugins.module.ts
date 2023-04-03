import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'richtext',
        loadChildren: () => import('./richtext/richtext.module').then(m => m.RichtextModule),
        data: {
          breadcrumb: '块编辑器'
        }
      },
      {
        path: 'editor',
        loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule),
        data: {
          breadcrumb: '代码编辑器'
        }
      },
      {
        path: 'store',
        loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
        data: {
          breadcrumb: '本地存储'
        }
      },
      {
        path: 'table',
        loadChildren: () => import('./table/table.module').then(m => m.TableModule),
        data: {
          breadcrumb: '动态表格'
        }
      },
      {
        path: 'upload',
        loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule),
        data: {
          breadcrumb: '上传'
        }
      },
      { path: '', redirectTo: 'richtext', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class PluginsModule {}
