import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MediaComponent } from './media.component';

const routes: Routes = [
  {
    path: '',
    component: MediaComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    ScrollingModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MediaComponent]
})
export class MediaModule {
}
