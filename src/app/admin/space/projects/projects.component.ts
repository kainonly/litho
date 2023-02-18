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
  searchText = '';
  dataset: WpxData<AnyDto<Project>> = new WpxData<AnyDto<Project>>();

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

  clearSearch(): void {
    this.searchText = '';
    this.getData(true);
  }

  openAppKey(): void {
    this.modal.info({
      nzTitle: 'This is a notification message',
      nzContent: '<p>some messages...some messages...</p><p>some messages...some messages...</p>',
      nzOnOk: () => console.log('Info OK')
    });
  }

  form(doc?: AnyDto<Project>): void {
    this.modal.create({
      nzTitle: !doc ? $localize`Add` : $localize`Edit`,
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
      nzTitle: $localize`Are you sure delete this item?`,
      nzOkText: $localize`Yes`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.projects.delete(doc._id).subscribe(() => {
          this.message.success($localize`Data delete complete`);
          this.getData(true);
        });
      },
      nzCancelText: $localize`Think Again`
    });
  }
}
