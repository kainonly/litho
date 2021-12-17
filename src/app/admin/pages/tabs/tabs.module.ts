import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppShareModule } from '@share';

import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [AppShareModule, RouterModule],
  declarations: [TabsComponent],
  exports: [TabsComponent]
})
export class TabsModule {}
