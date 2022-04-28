import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { EmailComponent } from './email.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzDescriptionsModule, NzPipesModule],
  declarations: [EmailComponent, FormComponent],
  exports: [EmailComponent]
})
export class EmailModule {}
