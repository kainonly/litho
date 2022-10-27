import { Component, OnInit } from '@angular/core';

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
export class ProjectsComponent implements OnInit {
  /**
   * 显示
   */
  visible = false;
  /**
   * 数据
   */
  data: WpxData<AnyDto<Project>> = new WpxData<AnyDto<Project>>();

  constructor(public projects: ProjectsService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.open();
  }

  getData(refresh = false): void {
    this.projects.pages(this.data, refresh).subscribe(() => {});
  }

  open(): void {
    this.visible = true;
    this.getData(true);
  }

  close(): void {
    this.visible = false;
  }

  setContext(doc: AnyDto<Project>): void {}

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
