import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';

import { CenterComponent } from './center.component';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'work',
        loadChildren: () => import('./work/work.module').then(m => m.WorkModule),
        data: {
          breadcrumb: '工作台'
        }
      },
      {
        path: 'safety',
        loadChildren: () => import('./safety/safety.module').then(m => m.SafetyModule),
        data: {
          breadcrumb: '安全设置'
        }
      },
      {
        path: 'third-party',
        loadChildren: () => import('./third-party/third-party.module').then(m => m.ThirdPartyModule),
        data: {
          breadcrumb: '第三方关联'
        }
      },
      { path: '', redirectTo: '/center/work', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [CenterComponent]
})
export class CenterModule {}
