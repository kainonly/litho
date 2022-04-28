import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { ScheduleComponent } from './schedule.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzDescriptionsModule, NzPipesModule],
  declarations: [ScheduleComponent],
  exports: [ScheduleComponent]
})
export class ScheduleModule {}
