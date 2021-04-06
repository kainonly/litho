import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { MediaComponent, MediaModule } from 'van-skeleton/media';

export const CmsRoutes: Routes = [
  {
    path: 'media/:key',
    component: MediaComponent
  }
];

@NgModule({
  exports: [
    MediaModule
  ]
})
export class CmsModule {
}
