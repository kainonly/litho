import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { PromptComponent } from './prompt.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [PromptComponent],
  exports: [PromptComponent]
})
export class PromptModule {}
