import { Component, ViewChild } from '@angular/core';

import { Media, MediaService, WpxMediaComponent } from '@weplanx/components/media';
import { Transport } from '@weplanx/components/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-resources-pictures',
  templateUrl: './pictures.component.html'
})
export class PicturesComponent {
  @ViewChild('mediaRef') mediaRef!: WpxMediaComponent;
  searchText: string = '';
  labels: string[] = [];
  matchLabels: Set<string> = new Set<string>();

  constructor(private media: MediaService, private modal: NzModalService, private message: NzMessageService) {}

  getData(refresh = false): void {
    if (this.searchText) {
      this.mediaRef.ds.setSearchText(this.searchText);
    }
    this.mediaRef.ds.fetch(refresh);
  }

  /**
   * 获取标签
   */
  getLabels(): void {
    this.media.findLabels().subscribe(data => {
      this.labels = [...data];
    });
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
    if (fetch) {
      this.getData();
    }
  }

  /**
   * 设置所有标签
   * @param checked
   */
  matchLabelsChange(checked: boolean): void {
    this.labels.forEach(data => {
      this.matchLabelChange(checked, data, false);
    });
    this.getData();
  }

  /**
   * 清除筛选
   */
  clearSearch(): void {
    this.searchText = '';
    this.mediaRef.ds.clearSearchText();
    this.matchLabels.clear();
    this.getData(true);
  }

  upload(data: Transport[]): void {
    const docs: Media[] = data.map(v => ({
      type: 'picture',
      name: v.name,
      url: Reflect.get(v.file.originFileObj!, 'key')
    }));
    this.media.create({ docs }).subscribe(v => {
      this.getData(true);
    });
  }

  bulkUnchecked(): void {
    this.mediaRef.ds.checkedIds.clear();
    this.mediaRef.ds.updateCheckedStatus();
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: '您确认要删除这些图片吗?',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.media.bulkDelete([...this.mediaRef.ds.checkedIds.values()]).subscribe(() => {
          this.mediaRef.ds.checkedIds.clear();
          this.mediaRef.ds.updateCheckedStatus();
          this.mediaRef.ds.fetch(true);
          this.message.success('数据删除完成');
        });
      },
      nzCancelText: '否'
    });
  }
}
