import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { ShareModule } from '../share.module';
import { FormComponent } from './form/form.component';
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [ShareModule, DragDropModule, NzTreeModule, NzTreeSelectModule],
  declarations: [PagesComponent, FormComponent],
  exports: [PagesComponent]
})
export class PagesModule {}
