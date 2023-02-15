import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';

import { SpaceComponent } from './space.component';

const routes: Routes = [
  {
    path: '',
    component: SpaceComponent
  }
];

@NgModule({
  imports: [ShareModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [SpaceComponent]
})
export class SpaceModule {}
