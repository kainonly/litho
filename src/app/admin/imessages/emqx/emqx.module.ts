import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { EmqxComponent } from './emqx.component';

@NgModule({
  imports: [ShareModule],
  declarations: [EmqxComponent]
})
export class EmqxModule {}
