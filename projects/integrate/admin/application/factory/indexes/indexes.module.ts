import { NgModule } from '@angular/core';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

import { ShareModule } from '../share.module';
import { FormComponent } from './form/form.component';
import { IndexTypePipe } from './index-type.pipe';
import { IndexesComponent } from './indexes.component';

@NgModule({
  imports: [ShareModule, NzAutocompleteModule],
  declarations: [IndexesComponent, IndexTypePipe, FormComponent]
})
export class IndexesModule {}
