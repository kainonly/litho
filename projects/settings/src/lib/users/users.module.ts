import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [UsersComponent],
  providers: [UsersService]
})
export class UsersModule {}
