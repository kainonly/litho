import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxTableModule } from '@weplanx/components/table';

import { FormComponent } from './form/form.component';
import { RolesComponent } from './roles.component';
import { RolesService } from './roles.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule],
  declarations: [RolesComponent, FormComponent],
  providers: [RolesService]
})
export class RolesModule {}
