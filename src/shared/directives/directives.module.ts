import { NgModule } from '@angular/core';

import { Submit } from '@shared/directives/submit';
import { Text } from '@shared/directives/text';

@NgModule({
  imports: [Submit, Text],
  exports: [Submit, Text]
})
export class DirectivesModule {}
