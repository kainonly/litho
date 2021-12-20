import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { TabsModule } from '../tabs/tabs.module';
import { IndexTypePipe } from './index-type.pipe';
import { IndexesComponent } from './indexes.component';

const routes: Routes = [
  {
    path: '',
    component: IndexesComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes), TabsModule],
  declarations: [IndexesComponent, IndexTypePipe]
})
export class IndexesModule {}
