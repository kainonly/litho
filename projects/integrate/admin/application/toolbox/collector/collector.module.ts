import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { CollectorComponent } from './collector.component';

@NgModule({
  imports: [ShareModule],
  declarations: [CollectorComponent],
  exports: [CollectorComponent]
})
export class CollectorModule {}
