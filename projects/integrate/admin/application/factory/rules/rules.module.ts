import { NgModule } from '@angular/core';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

import { ShareModule } from '../share.module';
import { FormComponent } from './form/form.component';
import { RulesComponent } from './rules.component';

@NgModule({
  imports: [ShareModule, NzAutocompleteModule],
  declarations: [RulesComponent, FormComponent]
})
export class RulesModule {}
