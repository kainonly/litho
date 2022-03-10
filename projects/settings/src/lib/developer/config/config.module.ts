import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { ConfigComponent } from './config.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [ConfigComponent]
})
export class ConfigModule {}
