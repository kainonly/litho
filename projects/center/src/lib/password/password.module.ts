import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { PasswordComponent } from './password.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [PasswordComponent],
  exports: [PasswordComponent]
})
export class PasswordModule {}
