import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { LogsComponent } from './logs.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [LogsComponent]
})
export class LogsModule {}
