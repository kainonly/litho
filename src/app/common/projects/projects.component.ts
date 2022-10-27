import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { FormComponent } from '@common/projects/form/form.component';
import { ProjectsService } from '@common/projects/projects.service';
import { Project } from '@common/types';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  /**
   * 搜索
   */
  searchText = '';
  /**
   * 显示
   */
  visible = false;
  /**
   * 数据
   */
  data: WpxData<AnyDto<Project>> = new WpxData<AnyDto<Project>>();

  constructor(
    public projects: ProjectsService,
    private app: AppService,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  getData(refresh = false): void {
    this.projects.pages(this.data, refresh).subscribe(() => {});
  }

  /**
   * 打开面板
   */
  open(): void {
    this.visible = true;
    this.getData(true);
  }

  /**
   * 关闭
   */
  close(): void {
    this.visible = false;
  }

  /**
   * 提交搜索
   */
  submitSearch(): void {
    if (!this.searchText) {
      this.data.filter = {};
    } else {
      this.data.filter = { name: { $regex: this.searchText } };
    }
    this.getData(true);
  }

  /**
   * 设置上下文
   * @param doc
   */
  setContext(doc: AnyDto<Project>): void {
    this.app.namespace = doc.namespace;
    this.router.navigate([doc.namespace, 'settings']);
    this.close();
  }

  /**
   * 表单
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
      nzContent: `项目名称【${doc.name}】`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.projects.delete(doc._id).subscribe(() => {
          this.message.success('数据删除完成');
          this.getData(true);
        });
      },
      nzCancelText: '再想想'
    });
  }
}
