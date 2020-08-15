import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitSwalService, BitService, BitEventsService } from 'ngx-bit';
import { NzNotificationService, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd';
import { asyncValidator } from 'ngx-bit/operates';
import { switchMap } from 'rxjs/operators';
import { RoleService } from '@common/role.service';
import { ResourceService } from '@common/resource.service';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html'
})
export class RoleAddComponent implements OnInit, OnDestroy {
  @ViewChild('nzTree', { static: true }) nzTree: NzTreeComponent;
  private resource: string[] = [];
  nodes: NzTreeNodeOptions[] = [];
  form: FormGroup;

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private events: BitEventsService,
    private notification: NzNotificationService,
    private swal: BitSwalService,
    private roleService: RoleService,
    private resourceService: ResourceService
  ) {
  }

  ngOnInit() {
    this.bit.registerLocales(import('./language'));
    this.form = this.fb.group({
      name: this.fb.group(this.bit.i18nGroup({
        validate: {
          zh_cn: [Validators.required],
          en_us: []
        }
      })),
      key: [null, [Validators.required], [this.existsKey]],
      status: [true, [Validators.required]]
    });
    this.getNodes();
    this.events.on('locale').subscribe(() => {
      this.getNodes();
    });
  }

  ngOnDestroy(): void {
    this.events.off('locale');
  }

  existsKey = (control: AbstractControl) => {
    return asyncValidator(this.roleService.validedKey(control.value));
  };

  /**
   * 获取资源策略节点
   */
  getNodes() {
    this.resourceService.originLists().subscribe(data => {
      const refer: Map<string, NzTreeNodeOptions> = new Map();
      const lists = data.map(v => {
        const rows = {
          title: JSON.parse(v.name)[this.bit.locale] + '[' + v.key + ']',
          key: v.key,
          parent: v.parent,
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
   * 获取资源键
   */
  setResource() {
    this.resource = [];
    const queue = [...this.nzTree.getTreeNodes()];
    while (queue.length !== 0) {
      const node = queue.pop();
      if (node.isChecked || node.isHalfChecked) {
        this.resource.push(node.key);
      }
      const children = node.getChildren();
      if (children.length !== 0) {
        queue.push(...children);
      }
    }
  }

  /**
   * 全部选中
   */
  allChecked() {
    this.allCheckedStatus(true);
  }

  /**
   * 取消选中
   */
  allUnchecked() {
    this.allCheckedStatus(false);
  }

  /**
   * 设置展开状态
   */
  private allCheckedStatus(status: boolean) {
    const queue = [...this.nzTree.getTreeNodes()];
    while (queue.length !== 0) {
      const node = queue.pop();
      node.isHalfChecked = false;
      node.isChecked = status;
      const children = node.getChildren();
      if (children.length !== 0) {
        queue.push(...children);
      }
    }
    this.nzTree.nzCheckBoxChange.emit();
  }

  /**
   * 全部展开
   */
  allExpand() {
    this.allExpandStatus(true);
  }

  /**
   * 全部关闭
   */
  allClose() {
    this.allExpandStatus(false);
  }

  /**
   * 设置展开状态
   */
  private allExpandStatus(status: boolean) {
    const queue = [...this.nzTree.getTreeNodes()];
    while (queue.length !== 0) {
      const node = queue.pop();
      node.isExpanded = status;
      const children = node.getChildren();
      if (children.length !== 0) {
        queue.push(...children);
      }
    }
  }

  /**
   * 提交
   */
  submit(data) {
    Reflect.set(data, 'resource', this.resource);
    this.roleService.add(data).pipe(
      switchMap(res => this.swal.addAlert(res, this.form, {
        status: true
      }))
    ).subscribe(() => {
    });
  }
}
