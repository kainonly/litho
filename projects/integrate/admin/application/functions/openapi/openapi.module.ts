import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { FormComponent } from './form/form.component';
import { OpenapiComponent } from './openapi.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzDescriptionsModule, NzPipesModule],
  declarations: [OpenapiComponent, FormComponent],
  exports: [OpenapiComponent]
})
export class OpenapiModule {}
