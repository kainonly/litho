import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { FactoryComponent } from './factory/factory.component';
import { FactoryModule, factory } from './factory/factory.module';

export const application: Routes = [
  {
    path: 'factory',
    component: FactoryComponent,
    children: factory,
    data: {
      breadcrumb: '内容生成器'
    }
  },
  { path: '', redirectTo: '/settings/application/factory/home', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, FactoryModule]
})
export class ApplicationModule {}
