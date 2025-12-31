import { NgModule } from '@angular/core';

import { Box } from '@shared/components/box';
import { Keyword } from '@shared/components/keyword';
import { Split, SplitItem } from '@shared/components/split';
import { Toolbox } from '@shared/components/toolbox';

@NgModule({
  imports: [Box, Keyword, Split, SplitItem, Toolbox],
  exports: [Box, Keyword, Split, SplitItem, Toolbox]
})
export class ComponentsModule {}
