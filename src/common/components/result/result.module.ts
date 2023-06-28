import { NgModule } from '@angular/core';

import { AuthorizedComponent } from '@common/components/result/authorized/authorized.component';
import { UnauthorizeComponent } from '@common/components/result/unauthorize/unauthorize.component';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule],
  declarations: [AuthorizedComponent, UnauthorizeComponent],
  exports: [AuthorizedComponent, UnauthorizeComponent]
})
export class ResultModule {}
