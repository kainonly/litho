import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { WhitelistComponent } from './whitelist.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [WhitelistComponent]
})
export class WhitelistModule {}
