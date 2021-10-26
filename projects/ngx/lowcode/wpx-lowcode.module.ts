import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WpxHelperModule } from '@weplanx/ngx/helper';
import { WpxLayoutModule } from '@weplanx/ngx/layout';
import { WpxPipesModule } from '@weplanx/ngx/pipes';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { WpxPageComponent } from './wpx-page/wpx-page.component';
import { WpxPageSerivce } from './wpx-page/wpx-page.serivce';
import { WpxSchemaActComponent } from './wpx-schema/wpx-schema-act/wpx-schema-act.component';
import { WpxSchemaFieldActComponent } from './wpx-schema/wpx-schema-field-act/wpx-schema-field-act.component';
import { WpxSchemaComponent } from './wpx-schema/wpx-schema.component';
import { WpxSchemaService } from './wpx-schema/wpx-schema.service';
import { WpxTemplateTableComponent } from './wpx-template/wpx-template-table/wpx-template-table.component';
import { WpxTemplateComponent } from './wpx-template/wpx-template.component';
import { WpxTemplateService } from './wpx-template/wpx-template.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzCardModule,
    NzSpaceModule,
    NzInputModule,
    NzToolTipModule,
    NzTreeModule,
    NzTreeViewModule,
    NzTableModule,
    NzTagModule,
    NzDividerModule,
    NzDropDownModule,
    NzResultModule,
    NzTypographyModule,
    NzFormModule,
    NzRadioModule,
    NzModalModule,
    NzSelectModule,
    NzSwitchModule,
    NzTabsModule,
    NzCascaderModule,
    NzInputNumberModule,
    NzDescriptionsModule,
    NzListModule,
    NzCodeEditorModule,
    NzTreeSelectModule,
    NzAlertModule,
    NzPopoverModule,
    NzCheckboxModule,
    NzResizableModule,
    DragDropModule,
    WpxHelperModule,
    WpxPipesModule,
    WpxLayoutModule
  ],
  declarations: [
    WpxSchemaComponent,
    WpxSchemaActComponent,
    WpxSchemaFieldActComponent,
    WpxPageComponent,
    WpxTemplateComponent,
    WpxTemplateTableComponent
  ],
  exports: [
    WpxSchemaComponent,
    WpxSchemaActComponent,
    WpxSchemaFieldActComponent,
    WpxPageComponent,
    WpxTemplateComponent,
    WpxTemplateTableComponent
  ],
  providers: [WpxSchemaService, WpxPageSerivce, WpxTemplateService]
})
export class WpxLowcodeModule {}
