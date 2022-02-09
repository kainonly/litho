import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { WpxCheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [NzCheckboxModule, FormsModule],
  declarations: [WpxCheckboxComponent],
  exports: [WpxCheckboxComponent]
})
export class WpxCheckboxModule {}
