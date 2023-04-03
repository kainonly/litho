import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { RichtextComponent } from './richtext.component';

const routes: Routes = [
  {
    path: '',
    component: RichtextComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [RichtextComponent]
})
export class RichtextModule {}
