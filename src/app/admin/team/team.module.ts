import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: {
          breadcrumb: '成员管理'
        }
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class TeamModule {}
