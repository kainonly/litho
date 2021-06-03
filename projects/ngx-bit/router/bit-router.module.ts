import { NgModule } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BitPipeModule } from 'ngx-bit/pipe';
import { BitDirectiveModule } from 'ngx-bit/directive';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { BitRouterService } from './bit-router.service';
import { BitHeaderComponent } from './bit-header/bit-header.component';
import { BitSiderComponent } from './bit-sider/bit-sider.component';
import { BitContentComponent } from './bit-content/bit-content.component';

@NgModule({
  imports: [
    NzMenuModule,
    NzIconModule,
    BitDirectiveModule,
    BitPipeModule,
    NzLayoutModule
  ],
  declarations: [
    BitContentComponent,
    BitHeaderComponent,
    BitSiderComponent
  ],
  exports: [
    BitContentComponent,
    BitHeaderComponent,
    BitSiderComponent
  ],
  providers: [BitRouterService]
})
export class BitRouterModule {
}
