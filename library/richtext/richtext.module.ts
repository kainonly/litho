import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxFilebrowserModule } from '@weplanx/ng/filebrowser';

import { WpxRichtextComponent } from './richtext.component';

@NgModule({
  imports: [WpxModule, WpxFilebrowserModule, WpxShareModule],
  declarations: [WpxRichtextComponent],
  exports: [WpxRichtextComponent]
})
export class WpxRichtextModule {}
