import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppShareModule } from '@share';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [AppShareModule, RouterModule, NzAutocompleteModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
