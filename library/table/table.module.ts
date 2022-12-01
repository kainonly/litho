import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxStoreModule } from '@weplanx/ng/store';

import { OrderPipe } from './order.pipe';
import { WpxTableComponent } from './table.component';
import { WpxTableService } from './table.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxStoreModule],
  declarations: [WpxTableComponent, OrderPipe],
  exports: [WpxTableComponent],
  providers: [WpxTableService]
})
export class WpxTableModule {}
