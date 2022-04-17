import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxFormModule } from '@weplanx/components/form';
import { WpxTableModule } from '@weplanx/components/table';

import { FormComponent } from './form/form.component';
import { TableComponent } from './table.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule, WpxFormModule],
  declarations: [TableComponent, FormComponent]
})
export class TableModule {}
