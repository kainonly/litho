import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { PagesComponent } from './pages/pages.component';
import { pages, PagesModule } from './pages/pages.module';

export const application: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: pages,
    data: {
      breadcrumb: '内容生成器'
    }
  },
  { path: '', redirectTo: '/settings/application/pages/home', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, PagesModule]
})
export class ApplicationModule {}
