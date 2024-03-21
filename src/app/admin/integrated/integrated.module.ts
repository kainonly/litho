import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CosComponent } from './cloud/cos/cos.component';
import { CollaborationComponent } from './collaboration/collaboration.component';
import { ExtendComponent } from './extend/extend.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cloud',
        component: CosComponent,
        data: {
          breadcrumb: `Public Cloud`
        }
      },
      {
        path: 'collaboration',
        component: CollaborationComponent,
        data: {
          breadcrumb: `Collaboration`
        }
      },
      {
        path: 'extend',
        component: ExtendComponent,
        data: {
          breadcrumb: `Extend`
        }
      },
      { path: '', redirectTo: 'cloud', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class IntegratedModule {}
