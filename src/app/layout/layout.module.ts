import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppShareModule } from '@share';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [AppShareModule, RouterModule],
  declarations: [LayoutComponent, HeaderComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
