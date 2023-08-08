import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ImComponent } from './im.component';

const routes: Routes = [
  {
    path: '',
    component: ImComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ImComponent]
})
export class ImModule {}
