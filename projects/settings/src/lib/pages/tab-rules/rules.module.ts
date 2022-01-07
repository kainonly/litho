import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { RulesComponent } from './rules.component';

@NgModule({
  imports: [ShareModule],
  declarations: [RulesComponent]
})
export class RulesModule {}
