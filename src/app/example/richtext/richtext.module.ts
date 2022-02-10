import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxRichtextModule } from '@weplanx/components/richtext';

import { RichtextComponent } from './richtext.component';

const routes: Routes = [
  {
    path: '',
    component: RichtextComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxRichtextModule, RouterModule.forChild(routes)],
  declarations: [RichtextComponent]
})
export class RichtextModule {}
