import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { SchemaComponent } from './schema.component';
import { SchemaService } from './schema.service';

const routes: Routes = [
  {
    path: '',
    component: SchemaComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [SchemaComponent],
  providers: [SchemaService]
})
export class SchemaModule {}
