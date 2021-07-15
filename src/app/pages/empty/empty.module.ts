import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { EmptyComponent } from './empty.component';

const routes: Routes = [
  {
    path: '',
    component: EmptyComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [EmptyComponent]
})
export class EmptyModule {}
