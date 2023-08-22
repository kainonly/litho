import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Dataset } from '@common/models/dataset';
import { DatasetsService } from '@common/services/datasets.service';
import { WpxItems } from '@weplanx/ng';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ControlsComponent } from './controls/controls.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-admin-datasets',
  templateUrl: './datasets.component.html'
})
export class DatasetsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NzCardComponent, { read: ElementRef, static: true }) card!: ElementRef;

  items = new WpxItems<Dataset>('name');
  actived?: Dataset;
  y = '0px';

  private resizeObserver!: ResizeObserver;

  constructor(
    private datasets: DatasetsService,
    private modal: NzModalService,
    private message: NzMessageService,
    private contextMenu: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        this.y = height - 180 + 'px';
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.card.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  getData(): void {
    this.datasets.lists(this.items.searchText).subscribe(data => {
      this.items.data = [...data];
    });
  }

  clearSearch(): void {
    this.items.searchText = '';
    this.getData();
  }

  openForm(): void {
    this.modal.create<FormComponent>({
      nzTitle: '创建',
      nzContent: FormComponent,
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  openActions($event: MouseEvent, menu: NzDropdownMenuComponent, data: Dataset): void {
    this.actived = data;
    this.contextMenu.create($event, menu);
  }

  openControls(name: string): void {
    this.modal.create<ControlsComponent, string>({
      nzTitle: `控制【${name}】`,
      nzContent: ControlsComponent,
      nzData: name,
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(data: Dataset): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${data.name}】吗？`,
      nzOkDanger: true,
      nzOnOk: () => {
        this.datasets.delete(data.name).subscribe(() => {
          this.message.success(`数据更新成功`);
          this.getData();
        });
      }
    });
  }
}
