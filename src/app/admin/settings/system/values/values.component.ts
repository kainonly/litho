import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-admin-settings-system-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})
export class ValuesComponent implements OnInit {
  values: any[] = [];
  readonly checkedKeys: Set<string> = new Set<string>();
  checked: boolean = false;
  indeterminate = false;
  checkedNumber = 0;
  searchText = '';

  constructor(private wpx: WpxService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.wpx.getValues().subscribe(data => {
      this.values = [
        ...Object.entries(data)
          .map(v => {
            let [key, value] = v;
            switch (key) {
              case 'dsl':
              case 'ip_blacklist':
              case 'ip_whitelist':
                value = JSON.stringify(value);
                break;
            }
            return { key, value };
          })
          .filter(v => {
            if (!this.searchText) {
              return v;
            }
            return v.key.match(this.searchText);
          })
      ];
      console.debug('refresh');
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

  form(data?: any): void {
    this.modal.create({
      nzTitle: $localize`动态配置表单`,
      nzWidth: '732px',
      nzContent: FormComponent,
      nzComponentParams: {
        data
      },
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
        this.wpx.deleteValue(key).subscribe(() => {
          this.message.success($localize`Data deleted successfully`);
          this.getData();
        });
      },
      nzCancelText: $localize`再想想`
    });
  }
}
