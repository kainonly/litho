import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';
import { WpxPageComponent, WpxSchemaComponent, WpxSettingsModule } from '@weplanx/components/settings';

const routes: Routes = [
  {
    path: 'schema',
    component: WpxSchemaComponent
  },
  {
    path: 'page',
    component: WpxPageComponent
  },
  { path: '', redirectTo: '/settings/schema', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, WpxSettingsModule, RouterModule.forChild(routes)]
})
export class SettingsModule {}
