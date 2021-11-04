import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';
// import { WpxPageComponent, WpxSchemaComponent } from '@weplanx/ngx/lowcode';

const routes: Routes = [
  // {
  //   path: 'schema',
  //   component: WpxSchemaComponent
  // },
  // {
  //   path: 'page',
  //   component: WpxPageComponent
  // },
  { path: '', redirectTo: '/settings/schema', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)]
})
export class SettingsModule {}
