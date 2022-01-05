import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [ShareModule, RouterModule, HeaderModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
