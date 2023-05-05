import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { TagFormComponent, TagInputData } from '@common/components/videos/tag-form/tag-form.component';
import { VideoTag } from '@common/interfaces/video';
import { VideoTagsService } from '@common/services/video-tags.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-videos-tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit {
  ds: WpxData<AnyDto<VideoTag>> = new WpxData<AnyDto<VideoTag>>();
  searchText = '';

  constructor(
    public app: AppService,
    private tags: VideoTagsService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.ds.filter = { shop_id: '64256825b16d000cd6bcfb5d' };
    this.ds.xfilter = { shop_id: 'oid' };
    if (this.searchText) {
      this.ds.filter.name = { $regex: this.searchText };
    }
    this.tags.pages(this.ds, refresh).subscribe(() => {});
  }

  clear(): void {
    this.searchText = '';
    this.getData(true);
  }

  form(doc?: AnyDto<VideoTag>): void {
    this.modal.create<TagFormComponent, TagInputData>({
      nzTitle: !doc ? `创建` : `编辑【${doc.name}】`,
      nzContent: TagFormComponent,
      nzData: {
        shopId: '64256825b16d000cd6bcfb5d',
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(doc: AnyDto<VideoTag>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除【${doc.name}】?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: $localize`再想想`,
      nzOnOk: () => {
        this.tags.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.getData(true);
        });
      }
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: $localize`您确认要删除这些吗?`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.tags
          .bulkDelete(
            { _id: { $in: [...this.ds.checkedIds.values()] } },
            {
              xfilter: { '_id.$in': 'oids' }
            }
          )
          .subscribe(() => {
            this.message.success($localize`数据删除成功`);
            this.ds.checkedIds.clear();
            this.ds.updateCheckedStatus();
            this.getData(true);
          });
      },
      nzCancelText: $localize`否`
    });
  }
}
