import { NgModule } from '@angular/core';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

@NgModule({
  imports: [WpxModule, WpxLayoutModule, WpxShareModule],
  declarations: [UsersComponent],
  providers: [UsersService]
})
export class UsersModule {}
