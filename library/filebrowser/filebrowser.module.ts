import { NgModule } from '@angular/core';

import { WpxFilebroserInputComponent } from './filebrowser-input.component';
import { WpxFilebrowserComponent } from './filebrowser.component';

@NgModule({
  imports: [WpxFilebrowserComponent, WpxFilebroserInputComponent],
  exports: [WpxFilebrowserComponent, WpxFilebroserInputComponent]
})
export class WpxFilebrowserModule {}
