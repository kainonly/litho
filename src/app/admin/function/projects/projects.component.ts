import { Component, OnInit } from '@angular/core';

import { ProjectsService } from '@common/projects.service';
import { Project } from '@common/types';
import { AnyDto, WpxData, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  /**
   * 搜索
   */
  searchText = '';
  /**
   * 数据
   */
  dataset: WpxData<AnyDto<Project>> = new WpxData<AnyDto<Project>>();
  /**
   * 展开集合
   */
  expand: Set<string> = new Set();

  constructor(
    public projects: ProjectsService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.projects.pages(this.dataset, refresh).subscribe(() => {});
  }

  expandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expand.add(id);
    } else {
      this.expand.delete(id);
    }
  }

  submitSearch(): void {
    if (!this.searchText) {
      this.dataset.filter = {};
    } else {
      this.dataset.filter = {
        $or: [{ name: { $regex: this.searchText } }, { namespace: { $regex: this.searchText } }]
      };
    }
    this.getData(true);
  }

  /**
   * 清除搜索
   */
  clearSearch(): void {
    this.searchText = '';
    this.getData(true);
  }

  /**
   * 编辑表单
   * @param doc
   */
  form(doc?: AnyDto<Project>): void {
    this.modal.create({
      nzTitle: !doc ? '新增' : '编辑',
      nzContent: FormComponent,
      nzComponentParams: {
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  /**
   * 删除
   * @param doc
   */
  delete(doc: AnyDto<Project>): void {
    this.modal.confirm({
      nzTitle: '您确定要删除该项目吗?',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.projects.delete(doc._id).subscribe(() => {
          this.message.success('数据删除完成');
        });
      },
      nzCancelText: '再想想'
    });
  }
}
