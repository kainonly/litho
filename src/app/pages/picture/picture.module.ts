import { NgModule } from '@angular/core';
import { PictureComponent } from './picture.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path: '',
    component: PictureComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    ScrollingModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PictureComponent]
})
export class PictureModule {
}
