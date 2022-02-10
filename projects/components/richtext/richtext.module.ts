import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { WpxRichtextComponent } from './richtext.component';

@NgModule({
  imports: [FormsModule, NzButtonModule, NzInputModule, NzIconModule, NzCardModule],
  declarations: [WpxRichtextComponent],
  exports: [WpxRichtextComponent]
})
export class WpxRichtextModule {}
