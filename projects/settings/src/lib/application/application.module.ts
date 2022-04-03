import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { OfficeComponent } from './office/office.component';
import { OfficeModule } from './office/office.module';
import { OverviewComponent } from './overview/overview.component';
import { OverviewModule } from './overview/overview.module';

export const application: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
    data: {
      breadcrumb: '概述'
    }
  },
  {
    path: 'office',
    component: OfficeComponent,
    data: {
      breadcrumb: '办公'
    }
  },
  { path: '', redirectTo: '/settings/application/overview', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, OverviewModule, OfficeModule]
})
export class ApplicationModule {}
