import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { WpxTableComponent } from './table.component';
import { WpxToolboxComponent } from './toolbox.component';

@NgModule({
  imports: [
    CommonModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSpaceModule,
    NzToolTipModule,
    NzGridModule,
    NzDropDownModule
  ],
  declarations: [WpxTableComponent, WpxToolboxComponent],
  exports: [WpxTableComponent, WpxToolboxComponent]
})
export class WpxTableModule {}
