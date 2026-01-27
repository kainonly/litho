import { NgModule } from '@angular/core';

import { Active } from '@shared/components/active';
import { Title } from '@shared/components/title';

import { Box } from './box';
import { Toolbox } from './toolbox';

@NgModule({
  imports: [Box, Toolbox, Active, Title],
  exports: [Box, Toolbox, Active, Title]
})
export class ComponentsModule {}
