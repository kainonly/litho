import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { AdvancedComponent } from './advanced.component';

@NgModule({
  imports: [ShareModule],
  declarations: [AdvancedComponent]
})
export class AdvancedModule {}
