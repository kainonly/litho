import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxTableModule } from '@weplanx/components/table';

import { DepartmentsModule } from '../departments/departments.module';
import { FormComponent } from './form/form.component';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule, DepartmentsModule],
  declarations: [UsersComponent, FormComponent],
  providers: [UsersService]
})
export class UsersModule {}
