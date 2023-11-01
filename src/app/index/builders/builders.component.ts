import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '@app';
import { Builder } from '@common/models/builder';
import { BuildersService } from '@common/services/builders.service';
import { AnyDto } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { FormComponent, FormInput } from './form/form.component';

@Component({
  selector: 'app-index-builders',
  templateUrl: './builders.component.html',
  styleUrls: ['./builders.component.less']
})
export class BuildersComponent implements OnInit {
  nodes: NzTreeNodeOptions[] = [];
  searchText = '';
  activedKey: string[] = [];
  actived?: NzTreeNode;

  constructor(
    private app: AppService,
    public builders: BuildersService,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private contextMenu: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.builders
      .getNzTreeNodeOptions(
        v =>
          <NzTreeNodeOptions>{
            title: v.name,
            key: v._id,
            parent: v.parent,
            icon: v.icon,
            isLeaf: true,
            expanded: true,
            selectable: v.kind !== 'nav',
            selected: false
          }
      )
      .subscribe(nodes => {
        this.nodes = [...nodes];
        const params = this.route.firstChild!.snapshot.params;
        if (params['id']) {
          this.activedKey = [params['id']];
        }
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

  selectedNode(e: NzFormatEmitEvent): void {
    const node = e.node!;
    const data = this.builders.dict[node.key];
    if (data.kind === 'nav') {
      return;
    }
    this.router.navigate(['/x', this.app.context, 'builders', data._id]);
  }

  openContextMenu(e: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.actived = e.node!;
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
