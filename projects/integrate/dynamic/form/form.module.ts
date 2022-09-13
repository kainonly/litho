import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxFormModule } from '@weplanx/ng/form';

import { FormComponent } from './form.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxFormModule],
  declarations: [FormComponent]
})
export class FormModule {}
