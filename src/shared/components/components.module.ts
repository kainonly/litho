import { NgModule } from '@angular/core';

import { Box } from './box';
import { Toolbox } from './toolbox';

@NgModule({
  imports: [Box, Toolbox],
  exports: [Box, Toolbox]
})
export class ComponentsModule { }
