import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { MediaComponent, MediaModule } from 'van-skeleton/media';
import { SchemaModule } from 'van-skeleton/schema';

export const CmsRoutes: Routes = [
  {
    path: 'media/:key',
    component: MediaComponent
  }
];

@NgModule({
  exports: [
    SchemaModule,
    MediaModule
  ]
})
export class CmsModule {
}
