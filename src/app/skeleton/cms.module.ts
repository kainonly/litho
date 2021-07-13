import { Routes } from '@angular/router';
import { CmsComponentModule } from '@vanx/cms/component';
import { MediaComponent, MediaModule } from '@vanx/cms/media';
import {
  SchemaAddComponent,
  SchemaEditComponent,
  SchemaHistoryComponent,
  SchemaIndexComponent,
  SchemaModule,
  SchemaOptionComponent
} from '@vanx/cms/schema';
import {
  TemplateAddComponent,
  TemplateEditComponent,
  TemplateIndexComponent,
  TemplateModule,
  TemplatePageComponent
} from '@vanx/cms/template';
import { NgModule } from '@angular/core';

export const CmsRoutes: Routes = [
  {
    path: 'schema-index',
    component: SchemaIndexComponent
  },
  {
    path: 'schema-add',
    component: SchemaAddComponent
  },
  {
    path: 'schema-edit/:id',
    component: SchemaEditComponent
  },
  {
    path: 'schema-option/:id',
    component: SchemaOptionComponent
  },
  {
    path: 'schema-history/:id',
    component: SchemaHistoryComponent
  },
  {
    path: 'index/:key',
    component: TemplateIndexComponent
  },
  {
    path: 'page/:key',
    component: TemplatePageComponent
  },
  {
    path: 'add/:key',
    component: TemplateAddComponent
  },
  {
    path: 'edit/:key/:id',
    component: TemplateEditComponent
  },
  {
    path: 'media/:key',
    component: MediaComponent
  }
];

@NgModule({
  exports: [CmsComponentModule, MediaModule, SchemaModule, TemplateModule]
})
export class CmsModule {}
