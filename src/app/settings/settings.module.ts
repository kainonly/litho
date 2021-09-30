import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

const routes: Routes = [
  {
    path: 'schema',
    loadChildren: () => import('./schema/schema.module').then(m => m.SchemaModule)
  },
  {
    path: 'page',
    loadChildren: () => import('./page/page.module').then(m => m.PageModule)
  },
  { path: '', redirectTo: '/settings/resource', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)]
})
export class SettingsModule {}
