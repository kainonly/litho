import { NgModule } from '@angular/core';

import { Active } from '@shared/components/active';
import { Keyword } from '@shared/components/keyword';
import { Split } from '@shared/components/split';
import { Title } from '@shared/components/title';

import { Box } from './box';
import { Toolbox } from './toolbox';

@NgModule({
  imports: [Box, Toolbox, Active, Title, Keyword, Split],
  exports: [Box, Toolbox, Active, Title, Keyword, Split]
})
export class ComponentsModule {}
