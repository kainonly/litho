import { NgModule } from '@angular/core';

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

import { ShareModule } from '../share.module';
import { ManualComponent } from './manual.component';
import { ScopeComponent } from './scope/scope.component';

@NgModule({
  imports: [ShareModule, NzDescriptionsModule],
  declarations: [ManualComponent, ScopeComponent]
})
export class ManualModule {}
