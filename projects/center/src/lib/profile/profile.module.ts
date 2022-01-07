import { NgModule } from '@angular/core';

import { WpxShareModule } from '@weplanx/common';

import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [WpxShareModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {}
