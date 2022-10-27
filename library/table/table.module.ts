import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { WpxTableComponent } from './table.component';
import { WpxTableService } from './table.service';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [WpxTableComponent],
  exports: [WpxTableComponent],
  providers: [WpxTableService]
})
export class WpxTableModule {}
