import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { StageComponent } from './stage.component';

@NgModule({
  imports: [ShareModule],
  declarations: [StageComponent],
  exports: [StageComponent]
})
export class StageModule {}
