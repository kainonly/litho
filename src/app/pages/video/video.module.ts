import { NgModule } from '@angular/core';
import { VideoComponent } from './video.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path: '',
    component: VideoComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    ScrollingModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VideoComponent]
})
export class VideoModule {
}
