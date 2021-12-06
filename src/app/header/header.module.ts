import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppShareModule } from '@share';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [AppShareModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
