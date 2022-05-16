import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { FormComponent } from './form/form.component';
import { RulesComponent } from './rules.component';

@NgModule({
  imports: [ShareModule],
  declarations: [RulesComponent, FormComponent]
})
export class RulesModule {}
