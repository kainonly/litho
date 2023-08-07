import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AppService } from '@app';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { KeyValue } from './types';

@Component({
  selector: 'app-admin-settings-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NzCardComponent, { read: ElementRef, static: true }) card!: ElementRef;

  searchText = '';
  items: KeyValue[] = [];
  loading = false;
  actived?: KeyValue;

  y = '0px';
  private resizeObserver!: ResizeObserver;

  constructor(
    private app: AppService,
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
    this.loading = true;
    this.app.getValues().subscribe(data => {
      this.items = [
        ...Object.entries(data)
          .map(([key, value]) => {
            switch (key) {
              case 'IpBlacklist':
              case 'IpWhitelist':
              case 'RestControls':
                value = JSON.stringify(value);
                break;
            }
            return <KeyValue>{ key, value };
          })
          .filter(v => {
            if (!this.searchText) {
              return v;
            }
            return v.key.match(this.searchText);
          })
      ];
      this.loading = false;
    });
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData();
  }

  openActions($event: MouseEvent, menu: NzDropdownMenuComponent, data: KeyValue): void {
    this.actived = data;
    this.contextMenu.create($event, menu);
  }

  form(data?: KeyValue): void {
    this.modal.create<FormComponent, KeyValue>({
      nzTitle: $localize`动态配置表单`,
      nzWidth: '732px',
      nzContent: FormComponent,
      nzData: data,
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(key: string): void {
    this.modal.confirm({
      nzTitle: $localize`您确定删除 [${key}] 配置吗？`,
      nzOkText: $localize`是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.app.deleteValue(key).subscribe(() => {
          this.message.success($localize`数据删除成功`);
          this.getData();
        });
      },
      nzCancelText: $localize`再想想`
    });
  }
}
