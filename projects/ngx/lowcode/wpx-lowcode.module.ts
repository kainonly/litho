import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WpxHelperModule } from '@weplanx/ngx/helper';
import { WpxLayoutModule } from '@weplanx/ngx/layout';
import { WpxPipesModule } from '@weplanx/ngx/pipes';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { WpxPageComponent } from './wpx-page/wpx-page.component';
import { WpxPageSerivce } from './wpx-page/wpx-page.serivce';
import { WpxSchemaComponent } from './wpx-schema/wpx-schema.component';
import { WpxSchemaService } from './wpx-schema/wpx-schema.service';
import { WpxTemplateComponent } from './wpx-template/wpx-template.component';
import { WpxTemplateService } from './wpx-template/wpx-template.service';

@NgModule({
  imports: [
    CommonModule,
    WpxLayoutModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzCardModule,
    NzSpaceModule,
    NzInputModule,
    NzToolTipModule,
    FormsModule,
    NzTreeModule,
    NzTreeViewModule,
    NzTableModule,
    NzTagModule,
    NzDividerModule,
    NzDropDownModule,
    NzResultModule,
    DragDropModule,
    NzTypographyModule,
    NzFormModule,
    NzRadioModule,
    NzModalModule,
    NzSelectModule,
    NzSwitchModule,
    NzTabsModule,
    ReactiveFormsModule,
    WpxHelperModule,
    WpxPipesModule
  ],
  declarations: [WpxSchemaComponent, WpxPageComponent, WpxTemplateComponent],
  exports: [WpxSchemaComponent, WpxPageComponent, WpxTemplateComponent],
  providers: [WpxSchemaService, WpxPageSerivce, WpxTemplateService]
})
export class WpxLowcodeModule {}
