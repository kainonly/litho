import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { EmqxComponent } from './emqx.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [ShareModule],
  declarations: [EmqxComponent, FormComponent]
})
export class EmqxModule {}
