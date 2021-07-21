import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { LayoutComponent } from './pages/layout/layout.component';
import { BitRouterModule } from 'ngx-bit/router';
import {NzAvatarModule} from "ng-zorro-antd/avatar";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'empty',
        loadChildren: () => import('./pages/empty/empty.module').then(m => m.EmptyModule)
      }
    ]
  }
];

@NgModule({
  imports: [AppShareModule, BitRouterModule, RouterModule.forChild(routes), NzAvatarModule],
  declarations: [LayoutComponent]
})
export class AppRoutingModule {}
