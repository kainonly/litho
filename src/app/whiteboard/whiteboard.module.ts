import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { WhiteboardComponent } from './whiteboard.component';

@NgModule({
  imports: [ShareModule],
  declarations: [WhiteboardComponent],
  exports: [WhiteboardComponent]
})
export class WhiteboardModule {}
