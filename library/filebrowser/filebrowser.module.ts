import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxKeywordModule } from '@weplanx/ng/keyword';
import { WpxUploadModule } from '@weplanx/ng/upload';

import { WpxFilebrowserComponent } from './filebrowser.component';

@NgModule({
  imports: [ScrollingModule, DragDropModule, WpxModule, WpxUploadModule, WpxShareModule, WpxKeywordModule],
  declarations: [WpxFilebrowserComponent],
  exports: [WpxFilebrowserComponent]
})
export class WpxFilebrowserModule {}
