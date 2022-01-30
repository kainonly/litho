import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { EmailComponent } from './email.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [EmailComponent],
  exports: [EmailComponent]
})
export class EmailModule {}
