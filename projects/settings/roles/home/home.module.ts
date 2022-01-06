import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';
import { NzResultModule } from 'ng-zorro-antd/result';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [WpxModule, WpxLayoutModule, WpxShareModule, NzResultModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent]
})
export class HomeModule {}
