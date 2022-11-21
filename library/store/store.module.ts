import { NgModule } from '@angular/core';

import { WpxModule } from '@weplanx/ng';

import { WpxStoreService } from './store.service';

@NgModule({
  imports: [WpxModule],
  providers: [WpxStoreService]
})
export class WpxStoreModule {}
