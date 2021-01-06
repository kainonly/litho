import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzImageModule } from 'ng-zorro-antd/image';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    ScrollingModule,
    NzImageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GalleryComponent]
})
export class GalleryModule {
}
