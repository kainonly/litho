import { NgModule } from '@angular/core';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';
import { NzResultModule } from 'ng-zorro-antd/result';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [WpxModule, WpxLayoutModule, WpxShareModule, NzResultModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
