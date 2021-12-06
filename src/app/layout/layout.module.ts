import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppShareModule } from '@share';

import { HeaderModule } from '../header/header.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [AppShareModule, RouterModule, HeaderModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
