import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { EmptyComponent } from './empty.component';

const routes: Routes = [
  {
    path: '',
    component: EmptyComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [EmptyComponent]
})
export class EmptyModule {}
