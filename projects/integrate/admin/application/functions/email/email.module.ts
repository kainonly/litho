import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { BasicComponent } from './basic/basic.component';
import { EmailComponent } from './email.component';

@NgModule({
  imports: [ShareModule],
  declarations: [EmailComponent, BasicComponent],
  exports: [EmailComponent]
})
export class EmailModule {}
