import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { WpxTableComponent } from './table.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzTypographyModule, NzResizableModule],
  declarations: [WpxTableComponent],
  exports: [WpxTableComponent]
})
export class WpxTableModule {}
