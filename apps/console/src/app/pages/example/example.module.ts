import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

import { ExampleComponent } from './example.component';

@NgModule({
  imports: [ShareModule, NzTimelineModule],
  declarations: [ExampleComponent]
})
export class ExampleModule {}
