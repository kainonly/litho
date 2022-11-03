import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { auditTime, BehaviorSubject, mergeMap } from 'rxjs';

import { AppService } from '@app';
import { AnyDto, Page } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

import { FormComponent } from './form/form.component';
import { PagesService } from './pages.service';
import { PageFlatNode, PageNode } from './types';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  /**
   * 页面 ID
   */
  pageId?: string;
  /**
   * 树视图控制
   */
  control = new FlatTreeControl<PageFlatNode>(
    node => node.level,
    node => node.expandable
  );
  /**
   * 选择模型
   */
  selection = new SelectionModel<string>();
  flatNodeMap = new Map<string, PageFlatNode>();
  /**
   * 获取扁平节点
   * @param node
   * @param level
   */
  transformer = (node: PageNode, level: number): PageFlatNode => {
    const flatNode = {
      ...node,
      expandable: !!node.children && node.children.length > 0,
      level,
      disabled: !!node.disabled
    };
    this.flatNodeMap.set(flatNode._id, flatNode);
    return flatNode;
  };
  /**
   * 转换器
   */
  flattener = new NzTreeFlattener<PageNode, PageFlatNode>(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  /**
   * 数据源
   */
  ds = new NzTreeFlatDataSource(this.control, this.flattener);
  /**
   * 搜索文本
   */
  searchText$ = new BehaviorSubject('');
  /**
   * 操作选中节点
   */
  actionNode?: PageFlatNode;
  /**
   * 重组树视图
   */
  reorganizationVisible = false;
  /**
   * 重组节点数组
   */
  reorganizationNodes: NzTreeNodeOptions[] = [];
  /**
   * 重组节点
   */
  reorganizationNode?: NzTreeNode;

  constructor(
    public app: AppService,
    public pages: PagesService,
    private modal: NzModalService,
    private nzContextMenuService: NzContextMenuService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.firstChild?.params.subscribe(params => {
      if (params['id']) {
        this.pageId = params['id'];
        this.selection.select(params['id']);
      }
    });
    this.getData(true);
    this.searchText$.pipe(auditTime(300)).subscribe(text => {
      if (text) {
        this.control.collapseAll();
        const expands: PageFlatNode[] = [...this.flatNodeMap.values()].filter(v => v.name.search(text) !== -1);
        while (expands.length !== 0) {
          const node = expands.pop()!;
          if (node.expandable) {
            this.control.expand(node);
          }
          if (node.parent) {
            expands.push(this.flatNodeMap.get(node.parent)!);
          }
        }
        this.control.expand(this.flatNodeMap.get('低代码示例')!);
      } else {
        this.control.expandAll();
      }
    });
  }

  /**
   * 存在子节点
   * @param _
   * @param node
   */
  hasChild = (_: number, node: PageFlatNode): boolean => node.expandable;

  /**
   * 获取数据
   */
  getData(first = false): void {
    this.pages.getNodes().subscribe(v => {
      this.ds.setData(v);
      if (first) {
        this.control.expandAll();
      }
    });
  }

  /**
   * 选择
   */
  selected(node: PageFlatNode): void {
    if (node.kind === 'group') {
      return;
    }
    this.selection.toggle(node._id);
    const namespace = this.app.project?.namespace;
    if (!this.selection.isSelected(node._id)) {
      this.pageId = undefined;
      this.router.navigate([namespace, 'pages', 'home']);
    } else {
      this.pageId = node._id;
      switch (node.kind) {
        case 'default':
          this.router.navigate([namespace, 'pages', node._id, 'schema']);
          break;
        case 'aggregation':
          break;
        case 'manual':
          this.router.navigate([namespace, 'pages', node._id, 'manual']);
          break;
      }
    }
  }

  /**
   * 操作
   * @param $event
   * @param menu
   * @param node
   */
  actions($event: MouseEvent, menu: NzDropdownMenuComponent, node?: PageFlatNode): void {
    if (node) {
      $event.stopPropagation();
      this.actionNode = node;
    }
    this.nzContextMenuService.create($event, menu);
  }

  /**
   * 打开表单
   * @param doc
   * @param parent
   */
  form(doc?: AnyDto<Page>, parent?: string): void {
    this.modal.create({
      nzTitle: !doc ? '新增' : `编辑【${doc.name}】`,
      nzContent: FormComponent,
      nzComponentParams: {
        doc,
        parent
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 删除
   * @param data
   */
  delete(data: AnyDto<Page>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${data.name}】页面吗?`,
      nzContent: '该操作不会删除实体集合，彻底清空需要数据库工具完成',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.pages.delete(data._id).subscribe(() => {
          this.message.success('数据删除完成');
          this.getData();
        });
      },
      nzCancelText: '再想想'
    });
  }

  /**
   * 开启重组
   */
  openReorganization(): void {
    this.reorganizationVisible = true;
    this.getReorganizationNodes();
  }

  /**
   * 获取重组节点数组
   */
  getReorganizationNodes(): void {
    this.pages.getNzTreeNodeOptions().subscribe(v => {
      this.reorganizationNodes = v;
      this.reorganizationNode = undefined;
    });
  }

  /**
   * 关闭重组
   */
  closeReorganization(): void {
    this.reorganizationVisible = false;
  }

  /**
   * 开始重组
   * @param event
   */
  reorganization(event: NzFormatEmitEvent): void {
    if (!event.dragNode) {
      return;
    }
    this.reorganizationNode = event.dragNode;
  }

  /**
   * 提交重组
   */
  submitReorganization(): void {
    if (!this.reorganizationNode) {
      return;
    }
    const parentNode = this.reorganizationNode.getParentNode();
    let parent: any = null;
    let sort: string[];
    if (!parentNode) {
      sort = this.reorganizationNode.treeService!.rootNodes.map(v => v.key);
    } else {
      parent = parentNode.key;
      sort = parentNode.children.map(v => v.key);
    }
    this.pages
      .reorganization(this.reorganizationNode.key, parent)
      .pipe(mergeMap(() => this.pages.sort(sort)))
      .subscribe(() => {
        this.message.success('数据更新完成');
        this.getData();
      });
  }
}
