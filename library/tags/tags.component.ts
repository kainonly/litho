import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AnyDto, Filter, WpxApi, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { FormData, Tag } from './types';

@Component({
  selector: 'wpx-tags',
  templateUrl: './tags.component.html'
})
export class WpxTagsComponent {
  @Input() wpxApi!: WpxApi<Tag>;
  @Input() wpxFilter?: (v: Filter<AnyDto<Tag>>) => void;
  @Input() wpxForm?: FormGroup;
  @Input() wpxFormTemplate?: TemplateRef<any>;

  visible = false;

  dataset: WpxData<AnyDto<Tag>> = new WpxData<AnyDto<Tag>>();
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
    this.dataset.filter = {};
    if (this.searchText) {
      this.dataset.filter = {
        name: { $regex: this.searchText }
      };
    }
    this.wpxFilter?.(this.dataset.filter);
    this.wpxApi.pages(this.dataset, refresh).subscribe(() => {});
  }

  clear(): void {
    this.searchText = '';
    this.getData(true);
  }

  form(doc?: AnyDto<Tag>): void {
    this.modal.create<FormComponent, FormData>({
      nzTitle: !doc ? $localize`新增` : $localize`编辑`,
      nzContent: FormComponent,
      nzData: {
        doc: doc,
        api: this.wpxApi,
        form: this.wpxForm,
        formTemplate: this.wpxFormTemplate
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(doc: AnyDto<Tag>): void {
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
