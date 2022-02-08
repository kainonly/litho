import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxFormModule } from '@weplanx/components/form';

import { FormComponent } from './form.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxFormModule],
  declarations: [FormComponent]
})
export class FormModule {}
