import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { CloudComponent } from './cloud.component';
import { CosComponent } from './cos/cos.component';
import { TencentComponent } from './tencent/tencent.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, NzDescriptionsModule, NzPipesModule],
  declarations: [CloudComponent, TencentComponent, CosComponent],
  exports: [CloudComponent]
})
export class CloudModule {}
