import { NgModule } from '@angular/core';

import { CodeviewModule } from '@common/components/codeview/codeview.module';
import { ShareModule } from '@common/share.module';
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

import { ControlComponent } from './control.component';
import { LogsComponent } from './logs/logs.component';
import { StateComponent } from './state/state.component';

@NgModule({
  imports: [ShareModule, NzCronExpressionModule, CodeviewModule],
  declarations: [ControlComponent, StateComponent, LogsComponent]
})
export class ControlModule {}
