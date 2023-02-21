import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'grid',
        loadChildren: () => import('./grid/grid.module').then(m => m.GridModule),
        data: {
          breadcrumb: '栅格'
        }
      },
      {
        path: 'card',
        loadChildren: () => import('./card/card.module').then(m => m.CardModule),
        data: {
          breadcrumb: '卡片'
        }
      },
      { path: '', redirectTo: 'grid', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class BlocksModule {}
