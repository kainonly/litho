import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-admin-toolbox-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})
export class ValuesComponent implements OnInit {
  /**
   * 配置值
   */
  values: any[] = [];
  /**
   * 搜索显示
   */
  searchVisible = false;
  /**
   * 搜索值
   */
  searchValue = '';

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
          .map(v => ({ key: v[0], value: v[1] }))
          .filter(v => {
            if (!this.searchValue) {
              return v;
            }
            return v.key.match(this.searchValue);
          })
      ];
    });
  }

  /**
   * 重置
   */
  reset(): void {
    this.searchValue = '';
    this.getData();
  }

  /**
   * 编辑动态配置
   * @param data
   */
  form(data?: any): void {
    this.modal.create({
      nzTitle: '设置',
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
