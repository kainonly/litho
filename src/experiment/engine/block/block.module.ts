import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxBlockModule } from '@weplanx/block';

import { BlockComponent } from './block.component';

const routes: Routes = [
  {
    path: '',
    component: BlockComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxBlockModule, RouterModule.forChild(routes)],
  declarations: [BlockComponent]
})
export class BlockModule {}
