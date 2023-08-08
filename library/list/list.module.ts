import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { WpxListComponent } from './list.component';

@NgModule({
  imports: [CommonModule, WpxModule, WpxShareModule],
  declarations: [WpxListComponent],
  exports: [WpxListComponent]
})
export class WpxListModule {}
