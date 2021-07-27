import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppShareModule } from '@share';
import { BitRouterModule } from 'ngx-bit/router';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [AppShareModule, BitRouterModule, RouterModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
