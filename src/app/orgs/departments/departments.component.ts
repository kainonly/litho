import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { auditTime, BehaviorSubject, mergeMap } from 'rxjs';

import { AnyDto } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

import { DepartmentsService } from './departments.service';
import { FormComponent } from './form/form.component';
import { Department, DepartmentFlatNode, DepartmentNode } from './types';

@Component({
  selector: 'app-orgs-departments',
  templateUrl: './departments.component.html'
})
export class DepartmentsComponent implements OnInit {
  /**
   * 部门 ID
   */
  @Input() id?: string;
  /**
   * 部门 ID 变更
   */
  @Output() readonly idChange: EventEmitter<string> = new EventEmitter<string>();
  /**
   * 树视图控制
   */
  control = new FlatTreeControl<DepartmentFlatNode>(
    node => node.level,
    node => node.expandable
  );
  /**
   * 选择模型
   */
  selection = new SelectionModel<string>();
  /**
   * Node Map
   */
  flatNodeMap = new Map<string, DepartmentFlatNode>();
  /**
   * 获取扁平节点
   * @param node
   * @param level
   */
  transformer = (node: DepartmentNode, level: number): DepartmentFlatNode => {
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
  flattener = new NzTreeFlattener<DepartmentNode, DepartmentFlatNode>(
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
  actionNode?: DepartmentFlatNode;
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
    public departments: DepartmentsService,
    private modal: NzModalService,
    private nzContextMenu: NzContextMenuService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData(true);
    this.searchText$.pipe(auditTime(300)).subscribe(text => {
      if (text) {
        this.control.collapseAll();
        const expands: DepartmentFlatNode[] = [...this.flatNodeMap.values()].filter(v => v.name.search(text) !== -1);
        while (expands.length !== 0) {
          const node = expands.pop()!;
          if (node.expandable) {
            this.control.expand(node);
          }
          if (node.parent) {
            expands.push(this.flatNodeMap.get(node.parent)!);
          }
        }
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
  hasChild = (_: number, node: DepartmentFlatNode): boolean => node.expandable;

  /**
   * 获取数据
   */
  getData(first = false): void {
    this.departments.getNodes().subscribe(v => {
      this.ds.setData(v);
      if (first) {
        this.control.expandAll();
      }
    });
  }

  /**
   * 选中
   * @param node
   */
  selected(node: DepartmentFlatNode): void {
    this.selection.toggle(node._id);
    if (this.selection.isSelected(node._id)) {
      this.id = node._id;
    } else {
      this.id = undefined;
    }
    this.idChange.emit(this.id);
  }

  /**
   * 操作
   * @param $event
   * @param menu
   * @param node
   */
  actions($event: MouseEvent, menu: NzDropdownMenuComponent, node?: DepartmentFlatNode): void {
    if (node) {
      $event.stopPropagation();
      this.actionNode = node;
    }
    this.nzContextMenu.create($event, menu);
  }

  /**
   * 打开表单
   * @param doc
   * @param parent
   */
  form(doc?: any, parent?: string): void {
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
   * 删除部门
   * @param doc
   */
  delete(doc: AnyDto<Department>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】部门吗?`,
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        this.departments.delete(doc._id).subscribe(() => {
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
    // this.pages.getNzTreeNodeOptions().subscribe(v => {
    //   this.reorganizationNodes = v;
    //   this.reorganizationNode = undefined;
    // });
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
    this.departments
      .reorganization(this.reorganizationNode.key, parent)
      .pipe(mergeMap(() => this.departments.sort(sort)))
      .subscribe(v => {
        this.message.success('数据更新完成');
        this.getData();
      });
  }
}
