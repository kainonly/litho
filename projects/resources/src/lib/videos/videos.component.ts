import { Component, ViewChild } from '@angular/core';

import { Media, VideosService, WpxMediaViewComponent } from '@weplanx/components/media';
import { Transport } from '@weplanx/components/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-resources-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent {
  @ViewChild('mediaView') mediaView!: WpxMediaViewComponent;
  searchText: string = '';
  labels: string[] = [];
  matchLabels: Set<string> = new Set<string>();
  accept: string[] = ['video/mp4'];

  constructor(private videos: VideosService, private modal: NzModalService, private message: NzMessageService) {}

  getData(refresh = false): void {
    if (this.searchText) {
      this.mediaView.ds.setSearchText(this.searchText);
    }
    this.mediaView.ds.fetch(refresh);
  }

  /**
   * 获取标签
   */
  getLabels(): void {
    this.videos.findLabels().subscribe(data => {
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
    this.mediaView.ds.clearSearchText();
    this.matchLabels.clear();
    this.getData(true);
  }

  upload(data: Transport[]): void {
    const docs: Media[] = data.map(v => ({
      name: v.name,
      url: Reflect.get(v.file.originFileObj!, 'key')
    }));
    this.videos.create({ docs }).subscribe(v => {
      this.getData(true);
    });
  }

  bulkUnchecked(): void {
    this.mediaView.ds.checkedIds.clear();
    this.mediaView.ds.updateCheckedStatus();
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: '您确认要删除这些视频吗?',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.videos.bulkDelete([...this.mediaView.ds.checkedIds.values()]).subscribe(() => {
          this.mediaView.ds.checkedIds.clear();
          this.mediaView.ds.updateCheckedStatus();
          this.mediaView.ds.fetch(true);
          this.message.success('数据删除完成');
        });
      },
      nzCancelText: '否'
    });
  }
}
