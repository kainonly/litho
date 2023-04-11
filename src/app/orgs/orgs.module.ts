import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { OrgsComponent } from './orgs.component';

const routes: Routes = [
  {
    path: '',
    component: OrgsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OrgsComponent]
})
export class OrgsModule {}
