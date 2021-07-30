import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BitPageHeaderComponent } from './bit-page-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BitPageHeaderComponent],
  exports: [BitPageHeaderComponent]
})
export class BitPageHeaderModule {}
