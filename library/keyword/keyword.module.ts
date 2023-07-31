import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { WpxKeywordComponent } from './keyword.component';

@NgModule({
  imports: [CommonModule, FormsModule, NzInputModule, NzToolTipModule],
  declarations: [WpxKeywordComponent],
  exports: [WpxKeywordComponent]
})
export class WpxKeywordModule {}
