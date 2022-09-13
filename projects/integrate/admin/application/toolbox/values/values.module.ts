import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { FormComponent } from './form/form.component';
import { ValuesComponent } from './values.component';

@NgModule({
  imports: [ShareModule],
  declarations: [ValuesComponent, FormComponent],
  exports: [ValuesComponent]
})
export class ValuesModule {}
