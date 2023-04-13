import { Component, Input, TemplateRef } from '@angular/core';

import { AnyDto, WpxApi, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { QuickFormData, Quick } from './types';

@Component({
  selector: 'wpx-quick',
  templateUrl: './quick.component.html'
})
export class WpxQuickComponent {
  @Input() wpxApi!: WpxApi<Quick>;
  @Input() wpxHeaderCell?: Array<TemplateRef<any>>;
  @Input() wpxCell?: Array<TemplateRef<any>>;
  @Input() wpxFilter?: (ds: WpxData<AnyDto<any>>) => void;
  @Input() wpxForm?: (doc?: AnyDto<any>) => void;

  visible = false;

  ds: WpxData<AnyDto<Quick>> = new WpxData<AnyDto<Quick>>();
  searchText = '';

  constructor(private modal: NzModalService, private message: NzMessageService) {}

  open(): void {
    this.visible = true;
    this.getData(true);
  }

  close(): void {
    this.visible = false;
  }

  getData(refresh = false): void {
    this.ds.filter = {};
    if (this.searchText) {
      this.ds.filter = {
        name: { $regex: this.searchText }
      };
    }
    this.wpxFilter?.(this.ds);
    this.wpxApi.pages(this.ds, refresh).subscribe(() => {});
  }

  clear(): void {
    this.searchText = '';
    this.getData(true);
  }

  form(doc?: AnyDto<any>): void {
    if (!this.wpxForm) {
      this.modal.create<FormComponent, QuickFormData>({
        nzTitle: !doc ? $localize`新增` : $localize`编辑`,
        nzContent: FormComponent,
        nzData: {
          doc: doc,
          api: this.wpxApi
        },
        nzOnOk: () => {
          this.getData(true);
        }
      });
    } else {
      this.wpxForm(doc);
    }
  }

  delete(doc: AnyDto<Quick>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除这个标签？`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.wpxApi.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: $localize`再想想`
    });
  }
}
