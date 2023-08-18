import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { IngressesComponent } from './ingresses.component';

const routes: Routes = [
  {
    path: '',
    component: IngressesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [IngressesComponent]
})
export class IngressesModule {}
