import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BitSwalService, BitService } from 'ngx-bit';
import { NzDrawerComponent, NzNotificationService, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd';
import { ListByPage } from 'ngx-bit/factory';
import { RoleService } from '@common/role.service';
import { ResourceService } from '@common/resource.service';

@Component({
  selector: 'app-role-index',
  templateUrl: './role-index.component.html'
})
export class RoleIndexComponent implements OnInit, AfterViewInit {
  @ViewChild('nzDrawer', { static: true }) nzDrawer: NzDrawerComponent;
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  lists: ListByPage;
  policyVisable = false;
  activeData: any;
  nodes: NzTreeNodeOptions[] = [];

  constructor(
    private swal: BitSwalService,
    public bit: BitService,
    private notification: NzNotificationService,
    public roleService: RoleService,
    private resourceService: ResourceService
  ) {
  }

  ngOnInit() {
    this.bit.registerLocales(import('./language'));
    this.lists = this.bit.listByPage({
      id: 'role-index',
      query: [
        { field: 'name->zh_cn', op: 'like', value: '' },
        { field: 'name->en_us', op: 'like', value: '' }
      ]
    });
    this.getLists();
    this.getNodes();
  }

  ngAfterViewInit(): void {
    this.nzDrawer.afterOpen.subscribe(() => {
      const resource = this.activeData.resource;
      const queue = [...this.nzTree.getTreeNodes()];
      while (queue.length !== 0) {
        const node = queue.pop();
        node.isChecked = resource.indexOf(node.key) !== -1;
        const parent = node.parentNode;
        if (parent) {
          parent.isChecked = parent.getChildren().every(v => resource.indexOf(v.key) !== -1);
          parent.isHalfChecked = !parent.isChecked && parent.getChildren().some(v => resource.indexOf(v.key) !== -1);
        }
        const children = node.getChildren();
        if (children.length !== 0) {
          queue.push(...children);
        }
      }
    });
  }

  /**
   * 获取列表数据
   */
  getLists(refresh = false, event?: number) {
    this.roleService.lists(
      this.lists,
      refresh,
      event !== undefined
    ).subscribe(data => {
      this.lists.setData(data.map(v => {
        v.acl = v.acl.split(',').map(c => c.split(':'));
        v.resource = v.resource.split(',');
        return v;
      }));
    });
  }

  /**
   * 获取资源节点
   */
  getNodes() {
    this.resourceService.originLists().subscribe(data => {
      const refer: Map<string, NzTreeNodeOptions> = new Map();
      const lists = data.map(v => {
        const rows = {
          title: JSON.parse(v.name)[this.bit.locale] + '[' + v.key + ']',
          key: v.key,
          parent: v.parent,
          disableCheckbox: true,
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
      this.nodes = nodes;
    });
  }

  /**
   * 删除单操作
   */
  deleteData(id: any[]) {
    this.swal.deleteAlert(this.roleService.delete(id)).subscribe(res => {
      if (!res.error) {
        this.notification.success(
          this.bit.l.operateSuccess,
          this.bit.l.deleteSuccess
        );
        this.getLists(true);
      } else {
        this.notification.error(
          this.bit.l.operateError,
          this.bit.l.deleteError
        );
      }
    });
  }

  /**
   * 选中删除
   */
  deleteCheckData() {
    const id = this.lists.getChecked().map(v => v.id);
    this.deleteData(id);
  }

  /**
   * 开启
   */
  openPolicy(data: any) {
    this.activeData = data;
    this.policyVisable = true;
  }

  closePolicy() {
    this.activeData = null;
    this.policyVisable = false;
  }

}
