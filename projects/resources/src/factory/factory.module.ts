import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { pages, PagesModule } from '@weplanx/resources';

import { PagesComponent } from './pages/pages.component';

export const factory: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: pages,
    data: {
      breadcrumb: '页面'
    }
  },
  { path: '', redirectTo: '/resources/factory/pages/home', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxShareModule, PagesModule, WpxModule]
})
export class FactoryModule {}
