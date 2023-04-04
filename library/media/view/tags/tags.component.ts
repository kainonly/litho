import { Component, Input, OnInit } from '@angular/core';

import { AnyDto, WpxData } from '@weplanx/ng';
import { MediaTag } from '@weplanx/ng/media';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PictureTagsService } from '../../picture-tags.service';
import { VideoTagsService } from '../../video-tags.service';
import { TagFormComponent, TagFormData } from '../tag-form/tag-form.component';

@Component({
  selector: 'wpx-media-view-tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit {
  @Input() tags!: PictureTagsService | VideoTagsService;

  dataset: WpxData<AnyDto<MediaTag>> = new WpxData<AnyDto<MediaTag>>();
  searchText = '';

  constructor(private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.tags.pages(this.dataset, refresh).subscribe(() => {});
  }

  submitSearch(): void {
    if (!this.searchText) {
      this.dataset.filter = {};
    } else {
      this.dataset.filter = {
        name: { $regex: this.searchText }
      };
    }
    this.getData(true);
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData(true);
  }

  form(doc?: AnyDto<MediaTag>): void {
    this.modal.create<TagFormComponent, TagFormData>({
      nzTitle: !doc ? $localize`新增` : $localize`编辑`,
      nzContent: TagFormComponent,
      nzData: {
        doc,
        tags: this.tags
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  delete(doc: AnyDto<MediaTag>): void {
    this.modal.confirm({
      nzTitle: $localize`您确定要删除这个标签？`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.tags.delete(doc._id).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: $localize`再想想`
    });
  }
}
