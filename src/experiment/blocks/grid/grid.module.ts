import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxBlockModule } from '@weplanx/block';

import { GridComponent } from './grid.component';

const routes: Routes = [
  {
    path: '',
    component: GridComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxBlockModule, RouterModule.forChild(routes)],
  declarations: [GridComponent]
})
export class GridModule {}
