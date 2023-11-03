import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of, switchMap } from 'rxjs';

import { AppService } from '@app';
import { Builder } from '@common/models/builder';
import { BuildersService } from '@common/services/builders.service';
import { Any, AnyDto, TransactionResult, WpxService } from '@weplanx/ng';
import { WpxCategoriesService } from '@weplanx/ng/categories';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatBeforeDropEvent, NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

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
    private wpx: WpxService,
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
            selectable: !['nav', 'manual'].includes(v.kind),
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
        if (doc) {
          this.builders.updated.next(doc._id);
        }
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
    if (['nav', 'manual'].includes(data.kind)) {
      return;
    }
    this.router.navigate(['/x', this.app.context, 'builders', node.isSelected ? data._id : 'index']);
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
          if (this.activedKey.includes(doc._id)) {
            this.router.navigate(['/x', this.app.context, 'builders', 'index']);
          }
          this.getData();
        });
      },
      nzCancelText: `再想想`
    });
  }

  beforeDrop = (e: NzFormatBeforeDropEvent): Observable<boolean> => {
    if (!e.node.parentNode) {
      return of(true);
    }
    const kind = this.builders.dict[e.node.parentNode.key].kind;
    if (kind === 'nav') {
      return of(true);
    }
    return of(false);
  };

  reorganization(e: NzFormatEmitEvent): void {
    const node = e.dragNode!;
    this.wpx
      .transaction()
      .pipe(
        switchMap<TransactionResult, Any>(({ txn }) => {
          const sources: Observable<Any>[] = [];
          if (node.origin['parent'] !== node.parentNode?.key) {
            sources.push(
              this.builders.updateById(
                node.key,
                { $set: { parent: node.parentNode ? node.parentNode.key : null } },
                { xdata: { '$set->parent': 'oid' }, txn }
              )
            );
          }
          const values: string[] = [];
          if (!node.parentNode) {
            values.push(...node.service!.rootNodes.map(v => v.key));
          } else {
            values.push(...node.parentNode.children.map(v => v.key));
          }
          sources.push(this.builders.sort('sort', values, { txn }));
          return forkJoin(sources).pipe(switchMap(() => this.wpx.commit(txn)));
        })
      )
      .subscribe(() => {
        this.message.success(`大纲重组成功`);
        this.getData();
      });
  }
}
