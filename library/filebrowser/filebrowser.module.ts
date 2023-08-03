import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxCategoriesModule } from '@weplanx/ng/categories';
import { WpxKeywordModule } from '@weplanx/ng/keyword';
import { WpxTableModule } from '@weplanx/ng/table';
import { WpxUploadModule } from '@weplanx/ng/upload';

import { CategoriesComponent } from './categories/categories.component';
import { WpxFilebroserInputComponent } from './filebrowser-input.component';
import { WpxFilebrowserComponent } from './filebrowser.component';
import { FormComponent } from './form/form.component';
import { PictureComponent } from './picture/picture.component';
import { VideoComponent } from './video/video.component';

@NgModule({
  imports: [
    ScrollingModule,
    DragDropModule,
    WpxModule,
    WpxUploadModule,
    WpxShareModule,
    WpxKeywordModule,
    WpxTableModule,
    WpxCategoriesModule
  ],
  declarations: [
    WpxFilebrowserComponent,
    WpxFilebroserInputComponent,
    FormComponent,
    CategoriesComponent,
    PictureComponent,
    VideoComponent
  ],
  exports: [WpxFilebrowserComponent, WpxFilebroserInputComponent]
})
export class WpxFilebrowserModule {}
