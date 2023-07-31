import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { WpxToolboxComponent } from './toolbox.component';

@NgModule({
  imports: [CommonModule, FormsModule, NzButtonModule, NzIconModule, NzToolTipModule, NzSpaceModule],
  declarations: [WpxToolboxComponent],
  exports: [WpxToolboxComponent]
})
export class WpxToolboxModule {}
