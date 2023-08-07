import { Component, OnInit } from '@angular/core';

import { Project } from '@common/models/project';
import { ProjectsService } from '@common/services/projects.service';
import { AnyDto, Filter, WpxService } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { EntryComponent, EntryModalData } from './entry/entry.component';
import { FormComponent, ModalData } from './form/form.component';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  items: AnyDto<Project>[] = [];
  actived?: AnyDto<Project>;

  searchText = '';

  constructor(
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService,
    private contextMenu: NzContextMenuService,
    private projects: ProjectsService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const filter: Filter<Project> = {};

    if (this.searchText !== '') {
      filter.$or = [{ name: { $regex: '^' + this.searchText } }, { namespace: { $regex: '^' + this.searchText } }];
    }

    this.projects.find(filter).subscribe(({ data }) => {
      this.items = [...data];
    });
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData();
  }

  openMenu($event: MouseEvent, menu: NzDropdownMenuComponent, doc: AnyDto<Project>): void {
    this.actived = doc;
    this.contextMenu.create($event, menu);
  }

  open(doc?: AnyDto<Project>): void {
    this.modal.create<FormComponent, ModalData>({
      nzTitle: !doc ? '创建' : `编辑【${doc.name}】`,
      nzWidth: 640,
      nzContent: FormComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  openEntry(doc: AnyDto<Project>): void {
    this.modal.create<EntryComponent, EntryModalData>({
      nzTitle: `入口编辑【${doc.name}】`,
      nzWidth: 640,
      nzContent: EntryComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(doc: AnyDto<Project>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.projects.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData();
        });
      },
      nzCancelText: `再想想`
    });
  }
}
