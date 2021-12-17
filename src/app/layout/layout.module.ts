import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { AppShareModule } from '@share';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [AppShareModule, RouterModule, HeaderModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
