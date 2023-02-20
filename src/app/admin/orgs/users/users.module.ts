import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'developer',
        loadChildren: () => import('./developer/developer.module').then(m => m.DeveloperModule),
        data: {
          breadcrumb: $localize`开发者`
        }
      },
      { path: '', redirectTo: 'developer', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class UsersModule {}
