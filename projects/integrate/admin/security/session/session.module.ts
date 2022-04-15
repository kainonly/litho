import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { SessionComponent } from './session.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzPipesModule],
  declarations: [SessionComponent]
})
export class SessionModule {}
