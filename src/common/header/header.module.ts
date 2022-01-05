import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [ShareModule, RouterModule, NzAutocompleteModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
