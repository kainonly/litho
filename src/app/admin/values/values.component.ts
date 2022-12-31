import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-admin-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})
export class ValuesComponent implements OnInit {
  /**
   * 配置值
   */
  values: any[] = [];
  /**
   * 选中的集合ID
   */
  readonly checkedKeys: Set<string> = new Set<string>();
  /**
   * 全部选中
   */
  checked: boolean = false;
  /**
   * 部分选中
   */
  indeterminate = false;
  /**
   * 被选中的数量
   */
  checkedNumber = 0;
  /**
   * 搜索值
   */
  searchText = '';

  constructor(private wpx: WpxService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * 获取数据
   */
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
    });
  }

  /**
   * 重置
   */
  clearSearch(): void {
    this.searchText = '';
    this.getData();
  }

  /**
   * 设置数据选中 Key
   */
  setCheckedKeys(key: string, checked: boolean): void {
    if (checked) {
      this.checkedKeys.add(key);
    } else {
      this.checkedKeys.delete(key);
    }
  }

  /**
   * 设置数据选中
   */
  setChecked(key: string, checked: boolean): void {
    this.setCheckedKeys(key, checked);
    this.updateCheckedStatus();
  }

  /**
   * 设置数据全部选中
   */
  setNChecked(checked: boolean): void {
    this.values.forEach(v => this.setCheckedKeys(v.key!, checked));
    this.updateCheckedStatus();
  }

  /**
   * 更新数据选中状态
   */
  updateCheckedStatus(): void {
    this.checked = this.values.every(v => this.checkedKeys.has(v.key));
    this.indeterminate = this.values.some(v => this.checkedKeys.has(v.key)) && !this.checked;
    this.checkedNumber = this.checkedKeys.size;
  }

  /**
   * 编辑动态配置
   * @param data
   */
  form(data?: any): void {
    this.modal.create({
      nzTitle: '设置',
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

  /**
   * 删除动态配置
   * @param key
   */
  delete(key: string): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${key}】配置吗?`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.wpx.deleteValue(key).subscribe(() => {
          this.message.success('配置删除完成');
          this.getData();
        });
      },
      nzCancelText: '再想想'
    });
  }
}
