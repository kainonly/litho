import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { application, ApplicationModule } from './application/application.module';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'application',
        children: application
      },
      { path: '', redirectTo: '/settings/application/pages/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, ApplicationModule, RouterModule.forChild(routes)],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
