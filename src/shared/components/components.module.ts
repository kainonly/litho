import { NgModule } from '@angular/core';

import { Box } from '@shared/components/box';
import { Keyword } from '@shared/components/keyword';
import { SingleContent } from '@shared/components/single-content';
import { Split, SplitItem } from '@shared/components/split';
import { Toolbox } from '@shared/components/toolbox';

@NgModule({
  imports: [Box, Keyword, SingleContent, Split, SplitItem, Toolbox],
  exports: [Box, Keyword, SingleContent, Split, SplitItem, Toolbox]
})
export class ComponentsModule {}
