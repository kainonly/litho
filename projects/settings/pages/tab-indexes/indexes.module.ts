import { NgModule } from '@angular/core';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';

import { TabsModule } from '../tabs/tabs.module';
import { FormComponent } from './form/form.component';
import { IndexTypePipe } from './index-type.pipe';
import { IndexesComponent } from './indexes.component';

@NgModule({
  imports: [WpxModule, WpxLayoutModule, WpxShareModule, TabsModule],
  declarations: [IndexesComponent, IndexTypePipe, FormComponent]
})
export class IndexesModule {}
