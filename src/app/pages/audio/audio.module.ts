import { NgModule } from '@angular/core';
import { AudioComponent } from './audio.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path: '',
    component: AudioComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    ScrollingModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AudioComponent]
})
export class AudioModule {
}
