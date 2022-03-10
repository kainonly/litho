import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { ConfigComponent } from './config/config.component';
import { ConfigModule } from './config/config.module';

export const developer: Routes = [
  {
    path: 'config',
    component: ConfigComponent,
    data: {
      breadcrumb: '配置列表'
    }
  }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, ConfigModule]
})
export class DeveloperModule {}
