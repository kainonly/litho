import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxFormModule } from '@weplanx/ng/form';
import { WpxTableModule } from '@weplanx/ng/table';

import { FormComponent } from './form/form.component';
import { TableComponent } from './table.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule, WpxFormModule],
  declarations: [TableComponent, FormComponent]
})
export class TableModule {}
