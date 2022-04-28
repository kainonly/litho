import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { FeishuComponent } from './feishu/feishu.component';
import { OfficeComponent } from './office.component';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzDescriptionsModule, NzPipesModule],
  declarations: [OfficeComponent, FeishuComponent, RedirectComponent],
  exports: [OfficeComponent]
})
export class OfficeModule {}
