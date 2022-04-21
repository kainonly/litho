import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { FunctionComponent } from './function.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [FunctionComponent]
})
export class FunctionModule {}
