import { NgModule } from '@angular/core';

import { Active } from '@shared/components/active';
import { Keyword } from '@shared/components/keyword';
import { Title } from '@shared/components/title';

import { Box } from './box';
import { Toolbox } from './toolbox';

@NgModule({
  imports: [Box, Toolbox, Active, Title, Keyword],
  exports: [Box, Toolbox, Active, Title, Keyword]
})
export class ComponentsModule {}
