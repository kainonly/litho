import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WpxRichtextComponent } from './richtext.component';

@NgModule({
  imports: [FormsModule],
  declarations: [WpxRichtextComponent],
  exports: [WpxRichtextComponent]
})
export class WpxRichtextModule {}
