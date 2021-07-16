import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { CmsComponentModule } from '@vanx/cms/component';
import { MediaComponent, MediaModule } from '@vanx/cms/media';

export const CmsRoutes: Routes = [
  {
    path: 'media/:key',
    component: MediaComponent
  }
];

@NgModule({
  exports: [CmsComponentModule, MediaModule]
})
export class CmsModule {}
