import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { BitDirectiveModule } from 'ngx-bit/directive';
import { BitI18nModule } from 'ngx-bit/i18n';
import { BitPipeModule } from 'ngx-bit/pipe';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { DirectiveModule } from './directive/directive.module';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzLayoutModule,
    NzSpaceModule,
    NzMenuModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzCardModule,
    NzToolTipModule,
    NzDrawerModule,
    NzMessageModule,
    NzNotificationModule,
    NzDividerModule,
    NzAutocompleteModule,
    NzCheckboxModule,
    NzPageHeaderModule,
    NzTableModule,
    NzListModule,
    NzMessageModule,
    NzTreeModule,
    NzTagModule,
    NzTreeSelectModule,
    NzRadioModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzAlertModule,
    NzResultModule,
    NzMessageModule,
    NzUploadModule,
    NzTypographyModule,
    NzModalModule,
    NzBadgeModule,
    NzPopoverModule,
    NzProgressModule,
    NzImageModule,
    NzSpinModule,
    NzPopconfirmModule,
    NzDescriptionsModule,
    NzTreeViewModule,
    NzDatePickerModule,
    NzTabsModule,
    NzTimelineModule,
    NzInputNumberModule,
    NzPopoverModule,
    NzAvatarModule,
    NzCascaderModule,
    NzStepsModule,
    NzStatisticModule,
    NzEmptyModule,
    PortalModule,
    BitDirectiveModule,
    BitPipeModule,
    BitI18nModule,
    DirectiveModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppShareModule {}
