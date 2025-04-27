import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@NgModule({
  exports: [
    RouterModule,
    NgOptimizedImage,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzTypographyModule,
    NzDividerModule,
    NzLayoutModule,
    NzFlexModule,
    NzGridModule,
    NzSpaceModule,
    NzDropDownModule,
    NzPageHeaderModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzRadioModule,
    NzSelectModule,
    NzSwitchModule,
    NzAvatarModule,
    NzBadgeModule,
    NzCardModule,
    NzDescriptionsModule,
    NzPopoverModule,
    NzListModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzCascaderModule,
    NzSegmentedModule,
    NzToolTipModule,
    NzDrawerModule,
    NzMessageModule,
    NzModalModule,
    NzPopconfirmModule,
    NzNotificationModule,
    NzImageModule,
    NzEmptyModule,
    NzPipesModule,
    NzAlertModule
  ],
  imports: [NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule {}
