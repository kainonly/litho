import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { WpxTableComponent } from './table.component';
import { WpxTableService } from './table.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzMenuModule, NzTypographyModule, NzResizableModule],
  declarations: [WpxTableComponent],
  exports: [WpxTableComponent],
  providers: [WpxTableService]
})
export class WpxTableModule {}
