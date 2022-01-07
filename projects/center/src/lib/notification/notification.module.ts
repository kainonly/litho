import { NgModule } from '@angular/core';

import { WpxShareModule } from '@weplanx/common';

import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [WpxShareModule],
  declarations: [NotificationComponent],
  exports: [NotificationComponent]
})
export class NotificationModule {}
