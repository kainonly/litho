import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Project } from '@common/models/project';
import { ProjectsService } from '@common/services/projects.service';
import { AnyDto } from '@weplanx/ng';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { EntryComponent, EntryModalData } from './entry/entry.component';
import { FormComponent, ModalData } from './form/form.component';
import { ProjectsDataSource } from './projects.data-source';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NzCardComponent, { read: ElementRef, static: true }) card!: ElementRef;

  ds!: ProjectsDataSource;
  actived?: AnyDto<Project>;

  private resizeObserver!: ResizeObserver;

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private contextMenu: NzContextMenuService,
    private projects: ProjectsService
  ) {}

  ngOnInit(): void {
    this.ds = new ProjectsDataSource(this.projects);
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        const n = width >= 1400 ? 3 : 2;
        if (this.ds.n !== n) {
          this.ds.n = n;
          this.ds.pagesize = n * 10;
          this.ds.fetch(true);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.card.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  clearSearch(): void {
    this.ds.searchText = '';
    this.ds.fetch(true);
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
        this.ds.fetch(true);
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
        this.ds.fetch(true);
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
          this.ds.fetch(true);
        });
      },
      nzCancelText: `再想想`
    });
  }
}
