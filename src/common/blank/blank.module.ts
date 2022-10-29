import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { BlankComponent } from './blank.component';

@NgModule({
  declarations: [BlankComponent],
  exports: [BlankComponent],
  imports: [ShareModule]
})
export class BlankModule {}
