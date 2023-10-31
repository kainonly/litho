import { Component, OnInit } from '@angular/core';

import { Builder } from '@common/models/builder';
import { Queue } from '@common/models/queue';
import { BuildersService } from '@common/services/builders.service';
import { AnyDto } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { FormComponent, FormInput } from '../form/form.component';

@Component({
  selector: 'app-index-builders-outline',
  templateUrl: './outline.component.html',
  styleUrls: ['./outline.component.less']
})
export class OutlineComponent implements OnInit {
  nodes: NzTreeNodeOptions[] = [];
  active?: NzTreeNode;
  searchText = '';

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    public builders: BuildersService,
    private contextMenu: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.builders.getNzTreeNodeOptions().subscribe(nodes => {
      this.nodes = [...nodes];
    });
  }

  openForm(doc?: AnyDto<Builder>): void {
    this.modal.create<FormComponent, FormInput>({
      nzTitle: !doc ? '创建' : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.active = data.node!;
  }

  openContextMenu(e: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.active = e.node!;
    this.contextMenu.create(e.event as MouseEvent, menu);
  }

  delete(doc: AnyDto<Builder>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.builders.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData();
        });
      },
      nzCancelText: `再想想`
    });
  }
}
