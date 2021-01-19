import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ResourceService } from '@api/resource.service';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFormatBeforeDropEvent, NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BitService, BitEventsService, BitSwalService } from 'ngx-bit';
import { Observable, of } from 'rxjs';
import { PolicyService } from '@api/policy.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AclService } from '@api/acl.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-resource-index',
  templateUrl: './resource-index.component.html',
  styleUrls: ['./resource-index.component.scss']
})
export class ResourceIndexComponent implements OnInit, OnDestroy {
  @ViewChild('nzTree') nzTree: NzTreeComponent;

  search = '';
  resource: NzTreeNodeOptions[] = [];
  activeNode: NzTreeNode;
  isSort = false;
  sortData = [];

  private expanded: Set<string> = new Set();

  policy: Map<string, any[]> = new Map();
  policyVisable = false;
  policyAcl: any[] = [];
  policyAclKey: string;
  policyValue = 0;

  constructor(
    public bit: BitService,
    private events: BitEventsService,
    private fb: FormBuilder,
    private swal: BitSwalService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private contextMenu: NzContextMenuService,
    private resourceService: ResourceService,
    public policyService: PolicyService,
    private aclService: AclService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
    this.getNodes();
    this.getPolicy();
    this.events.on('locale').subscribe(() => {
      this.getNodes();
    });
  }

  ngOnDestroy(): void {
    this.events.off('locale');
  }

  /**
   * 获取树形数据
   */
  getNodes(): void {
    this.resourceService.originLists().subscribe(data => {
      const refer: Map<string, NzTreeNodeOptions> = new Map();
      const lists = data.map(v => {
        const rows = {
          title: JSON.parse(v.name)[this.bit.locale],
          key: v.key,
          expanded: this.expanded.has(v.key),
          parent: v.parent,
          id: v.id,
          icon: v.icon,
          nav: v.nav,
          router: v.router,
          policy: v.policy,
          children: [],
          isLeaf: true
        };
        refer.set(v.key, rows);
        return rows;
      });
      const nodes: any[] = [];
      for (const x of lists) {
        if (x.parent === 'origin') {
          nodes.push(x);
        } else {
          const parent = x.parent;
          if (refer.has(parent)) {
            const rows = refer.get(parent);
            rows.isLeaf = false;
            rows.children.push(x);
            refer.set(parent, rows);
          }
        }
      }
      this.resource = nodes;
    });
  }

  /**
   * 获取策略数据
   */
  getPolicy(): void {
    this.policyService.originLists().subscribe(data => {
      this.policy.clear();
      for (const x of data) {
        if (this.policy.has(x.resource_key)) {
          const queue = this.policy.get(x.resource_key);
          queue.push({
            id: x.id,
            acl_key: x.acl_key,
            policy: x.policy
          });
          this.policy.set(x.resource_key, queue);
        } else {
          this.policy.set(x.resource_key, [
            {
              id: x.id,
              acl_key: x.acl_key,
              policy: x.policy
            }
          ]);
        }
      }
    });
  }

  /**
   * 获取访问控制
   */
  getAcl(): void {
    this.aclService.originLists().subscribe(data => {
      this.policyAcl = data;
    });
  }

  /**
   * 监听展开状态
   */
  onExpanded(): void {
    this.expanded = new Set();
    const queue = [...this.nzTree.getTreeNodes()];
    while (queue.length !== 0) {
      const node = queue.pop();
      if (node.isExpanded) {
        this.expanded.add(node.key);
      }
      const children = node.getChildren();
      if (children.length !== 0) {
        queue.push(...children);
      }
    }
  }

  /**
   * 设置展开状态
   */
  setExpand(status: boolean): void {
    this.expanded = new Set();
    const queue = [...this.nzTree.getTreeNodes()];
    while (queue.length !== 0) {
      const node = queue.pop();
      if (status) {
        this.expanded.add(node.key);
      }
      node.isExpanded = status;
      const children = node.getChildren();
      if (children.length !== 0) {
        queue.push(...children);
      }
    }
  }

  /**
   * more actions
   */
  actions(nzFormatEmitEvent: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.activeNode = nzFormatEmitEvent.node;
    this.contextMenu.create(nzFormatEmitEvent.event, menu);
  }

  /**
   * delete resource
   */
  deleteData(): void {
    if (this.activeNode.getChildren().length !== 0) {
      return;
    }
    this.swal.deleteAlert(
      this.resourceService.delete([this.activeNode.origin.id])
    ).subscribe(res => {
      if (!res.error) {
        this.message.success(this.bit.l.deleteSuccess);
        this.getNodes();
      } else {
        this.message.error(this.bit.l.deleteError);
      }
    });
  }

  /**
   * 开启排序
   */
  openSort(): void {
    this.isSort = true;
  }

  /**
   * 取消排序
   */
  closeSort(): void {
    this.isSort = false;
    this.sortData = [];
    this.getNodes();
  }

  /**
   * 拖拽限制
   */
  beforeDrop = (arg: NzFormatBeforeDropEvent): Observable<any> => {
    return of(
      arg.dragNode.level === arg.node.level &&
      arg.dragNode.origin.parent === arg.node.origin.parent &&
      arg.pos !== 0
    );
  };

  /**
   * 拖拽结束
   */
  dragEnd(): void {
    this.sortData = [];
    const queue = [...this.nzTree.getTreeNodes()];
    let originIndex = queue.length - 1;
    while (queue.length !== 0) {
      const node = queue.pop();
      if (node.origin.parent === 'origin') {
        this.sortData.push({
          id: node.origin.id,
          sort: originIndex
        });
        originIndex--;
      } else {
        this.sortData.push({
          id: node.origin.id,
          sort: node.origin.sort
        });
      }
      const children = node.getChildren();
      if (children.length !== 0) {
        queue.push(
          ...children.map((value, index) => {
            value.origin.sort = index;
            return value;
          })
        );
      }
    }
  }

  /**
   * 提交排序
   */
  sortSubmit(): void {
    this.resourceService.sort(
      this.sortData
    ).subscribe(res => {
      if (!res.error) {
        this.message.success(this.bit.l.sortSuccess);
        this.events.publish('refresh-menu');
        this.closeSort();
      } else {
        this.message.error(this.bit.l.sortError);
      }
    });
  }

  /**
   * 开启策略绑定编辑
   */
  openPolicy(): void {
    this.policyVisable = true;
    this.getAcl();
  }

  /**
   * 关闭策略绑定编辑
   */
  closePolicy(): void {
    this.policyVisable = false;
    this.policyReset();
  }

  private policyReset(): void {
    this.policyAclKey = undefined;
    this.policyValue = 0;
  }

  /**
   * 禁用已存在的访问控制键
   */
  disabledAclKey(value: string): boolean {
    if (!this.policy.has(this.activeNode.key)) {
      return false;
    }
    return this.policy.get(this.activeNode.key).some(v => v.acl_key === value);
  }

  /**
   * 提交策略绑定
   */
  policySubmit(): void {
    this.policyService.add({
      resource_key: this.activeNode.key,
      acl_key: this.policyAclKey,
      policy: this.policyValue
    }).subscribe(res => {
      if (!res.error) {
        this.notification.success(this.bit.l.success, this.bit.l.updateSuccess);
        this.policyReset();
        this.getPolicy();
        this.getAcl();
      } else {
        this.notification.error(this.bit.l.error, this.bit.l.updateError);
      }
    });
  }

  /**
   * 删除策略绑定
   */
  deletePolicy(id: any[]): void {
    this.policyService.delete(id).subscribe(res => {
      if (!res.error) {
        this.notification.success(this.bit.l.success, this.bit.l.deleteSuccess);
      } else {
        this.notification.error(this.bit.l.error, this.bit.l.deleteError);
      }
      this.getPolicy();
      this.getAcl();
    });
  }
}
