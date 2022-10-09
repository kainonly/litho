import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { HeaderComponent } from './header/header.component';
import { PathPipe } from './header/path.pipe';
import { LevelPipe } from './nav/level.pipe';
import { NavComponent } from './nav/nav.component';
import { PagesComponent } from './pages.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [PagesComponent, ToolbarComponent, HeaderComponent, PathPipe, NavComponent, LevelPipe]
})
export class PagesModule {}
