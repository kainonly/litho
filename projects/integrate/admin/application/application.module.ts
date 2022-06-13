import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { FactoryComponent } from './factory/factory.component';
import { FactoryModule, factory } from './factory/factory.module';
import { FunctionsComponent } from './functions/functions.component';
import { functions, FunctionsModule } from './functions/functions.module';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorModule } from './monitor/monitor.module';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { toolbox, ToolboxModule } from './toolbox/toolbox.module';

export const application: Routes = [
  {
    path: 'factory',
    component: FactoryComponent,
    children: factory,
    data: {
      breadcrumb: '内容生成器'
    }
  },
  {
    path: 'functions',
    component: FunctionsComponent,
    children: functions,
    data: {
      breadcrumb: '功能模块'
    }
  },
  {
    path: 'monitor',
    component: MonitorComponent,
    data: {
      breadcrumb: '监控'
    }
  },
  {
    path: 'toolbox',
    component: ToolboxComponent,
    children: toolbox,
    data: {
      breadcrumb: '工具箱'
    }
  },
  { path: '', redirectTo: '/admin/application/factory/home', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, FactoryModule, FunctionsModule, MonitorModule, ToolboxModule]
})
export class ApplicationModule {}
