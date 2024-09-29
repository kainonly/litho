import { NgModule } from '@angular/core';

import { RetryDirective } from '@common/directives/retry.directive';
import { SubmitDirective } from '@common/directives/submit.directive';

@NgModule({
  imports: [RetryDirective, SubmitDirective],
  exports: [RetryDirective, SubmitDirective]
})
export class DirectivesModule {}
