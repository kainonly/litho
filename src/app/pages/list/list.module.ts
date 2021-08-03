import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { BasicComponent } from './basic/basic.component';
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'basic',
    component: BasicComponent
  },
  {
    path: 'card',
    component: CardComponent
  },
  { path: '', redirectTo: '/list/search', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [BasicComponent, CardComponent, TableComponent]
})
export class ListModule {}
