import { Component } from '@angular/core';

import { AnyDto, Where } from '@weplanx/common';

import { Role } from '../../application/roles/types';

@Component({
  selector: 'wpx-settings-security-logs',
  templateUrl: './logs.component.html'
})
export class LogsComponent {
  items: Array<AnyDto<any>> = [];
  searchText: string = '';
  filter = true;
  labels: string[] = [];
  matchLabels: Set<string> = new Set<string>();

  getData(): void {
    const where: Where<Role> = {};
    if (this.searchText) {
      where['name'] = { $regex: this.searchText };
    }
    if (this.matchLabels.size !== 0) {
      where['labels'] = { $in: [...this.matchLabels.values()] };
    }
    // this.roles.find(where).subscribe(data => {
    //   this.items = [...data];
    // });
  }

  /**
   * 获取标签
   */
  getLabels(): void {
    // this.roles.findLabels().subscribe(data => {
    //   this.labels = [...data];
    // });
  }

  /**
   * 设置标签状态
   * @param checked
   * @param data
   * @param fetch
   */
  matchLabelChange(checked: boolean, data: string, fetch = true): void {
    if (checked) {
      this.matchLabels.add(data);
    } else {
      this.matchLabels.delete(data);
    }
    // if (fetch) {
    //   this.getData();
    // }
  }

  /**
   * 设置所有标签
   * @param checked
   */
  matchLabelsChange(checked: boolean): void {
    this.labels.forEach(data => {
      this.matchLabelChange(checked, data, false);
    });
    // this.getData();
  }

  /**
   * 清除筛选
   */
  clearSearch(): void {
    this.searchText = '';
    this.matchLabels.clear();
    this.getData();
  }
}
