import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { KeyValue } from './types';

@Component({
  selector: 'app-admin-settings-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})
export class ValuesComponent implements OnInit {
  values: KeyValue[] = [];
  readonly checkedKeys: Set<string> = new Set<string>();
  checked = false;
  indeterminate = false;
  checkedNumber = 0;
  searchText = '';

  constructor(
    private app: AppService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.app.getValues().subscribe(data => {
      this.values = [
        ...Object.entries(data)
          .map(v => {
            let [key, value] = v;
            switch (key) {
              case 'resources':
              case 'ip_blacklist':
              case 'ip_whitelist':
                value = JSON.stringify(value);
                break;
            }
            return <KeyValue>{ key, value };
          })
          .filter(v => {
            if (!this.searchText) {
              return v;
            }
            return v.key.match(this.searchText);
          })
      ];
    });
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData();
  }

  setCheckedKeys(key: string, checked: boolean): void {
    if (checked) {
      this.checkedKeys.add(key);
    } else {
      this.checkedKeys.delete(key);
    }
  }

  setChecked(key: string, checked: boolean): void {
    this.setCheckedKeys(key, checked);
    this.updateCheckedStatus();
  }

  setNChecked(checked: boolean): void {
    this.values.forEach(v => this.setCheckedKeys(v.key!, checked));
    this.updateCheckedStatus();
  }

  updateCheckedStatus(): void {
    this.checked = this.values.every(v => this.checkedKeys.has(v.key));
    this.indeterminate = this.values.some(v => this.checkedKeys.has(v.key)) && !this.checked;
    this.checkedNumber = this.checkedKeys.size;
  }

  form(data?: KeyValue): void {
    this.modal.create<FormComponent, KeyValue>({
      nzTitle: $localize`动态配置表单`,
      nzWidth: '732px',
      nzContent: FormComponent,
      nzData: data,
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(key: string): void {
    this.modal.confirm({
      nzTitle: $localize`您确定删除 [${key}] 配置吗？`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.app.deleteValue(key).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.getData();
        });
      },
      nzCancelText: $localize`再想想`
    });
  }
}
