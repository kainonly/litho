import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery.component';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent
  }
];

@NgModule({
  imports: [AppExtModule, RouterModule.forChild(routes)],
  declarations: [GalleryComponent]
})
export class GalleryModule {
}
