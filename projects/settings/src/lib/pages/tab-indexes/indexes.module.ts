import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { FormComponent } from './form/form.component';
import { IndexTypePipe } from './index-type.pipe';
import { IndexesComponent } from './indexes.component';

@NgModule({
  imports: [ShareModule],
  declarations: [IndexesComponent, IndexTypePipe, FormComponent]
})
export class IndexesModule {}
