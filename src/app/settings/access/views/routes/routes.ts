import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import {
  NzFormatBeforeDropEvent,
  NzFormatEmitEvent,
  NzTreeModule,
  NzTreeNode,
  NzTreeNodeOptions
} from 'ng-zorro-antd/tree';
import { Observable, of } from 'rxjs';

import { Global, SharedModule } from '@shared';
import { MenusApi } from '@shared/apis/menus';
import { RoutesApi } from '@shared/apis/routes';
import { Menu, Route } from '@shared/models';

import { Form, FormInput } from './form/form';
import { GroupForm, GroupFormInput } from './group-form/group-form';

@Component({
  imports: [SharedModule, NzTreeModule, NzSkeletonModule],
  selector: 'app-settings-access-views-routes-actions',
  templateUrl: './routes.html',
  styleUrl: `./routes.less`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Routes implements OnInit {
  global = inject(Global);
  menus = inject(MenusApi);
  routes = inject(RoutesApi);

  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);
  private contextMenu = inject(NzContextMenuService);

  menuId!: string;
  menuData?: Menu;
  nodes = signal<NzTreeNodeOptions[]>([]);
  routeM = signal<Record<string, Route>>({});
  selected = signal<Route | undefined>(undefined);

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ id }) => {
      this.menuId = id;
      this.getMenu();
      this.getData();
    });
  }

  getData(): void {
    const params = new HttpParams().set(`menu_id`, this.menuId);
    this.routes
      .find(params, { page: 1, pagesize: 1000 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ data }) => {
        this.routeM.set(this.buildRouteMap(data));
        this.nodes.set(this.buildNodes(data));
      });
  }

  private buildRouteMap(data: Route[]): Record<string, Route> {
    return data.reduce<Record<string, Route>>((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  }

  private buildNodes(data: Route[]): NzTreeNodeOptions[] {
    const nodesMap = new Map<string, NzTreeNodeOptions>();
    const roots: NzTreeNodeOptions[] = [];

    data.forEach(item => {
      nodesMap.set(item.id, {
        title: item.name,
        key: item.id,
        children: []
      });
    });

    data.forEach(item => {
      const node = nodesMap.get(item.id)!;
      node.selectable = false;
      node.expanded = true;

      if (item.pid && item.pid !== '0') {
        const parent = nodesMap.get(item.pid);
        if (parent) {
          parent.children = parent.children ?? [];
          parent.children.push(node);
        } else {
          roots.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  getMenu(): void {
    this.menus
      .findById(this.menuId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.menuData = data;
      });
  }

  openGroup(data?: Route): void {
    this.modal.create<GroupForm, GroupFormInput>({
      nzTitle: !data ? '新增分组' : `修改分组【${data.name}】`,
      nzContent: GroupForm,
      nzData: {
        menu: this.menuData!,
        data
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  expand(node: NzTreeNode): void {
    node.isExpanded = !node.isExpanded;
  }

  actions(event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.selected.set(this.routeM()[event.node!.key]);
    this.contextMenu.create(event.event as MouseEvent, menu);
  }

  open(data?: Route, pid?: string): void {
    this.modal.create<Form, FormInput>({
      nzTitle: !data ? '新增路由' : `修改路由【${data.name}】`,
      nzContent: Form,
      nzData: {
        menu: this.menuData!,
        data,
        pid
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  regroup(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  beforeDrop(arg: NzFormatBeforeDropEvent): Observable<boolean> {
    const dragNode = arg.dragNode;
    const targetNode = arg.node;
    const dropPosition = arg.pos;

    const dragLevel = dragNode.level;
    const targetLevel = targetNode.level;

    if (dragLevel === targetLevel && dropPosition !== 0) {
      return of(true);
    }
    if (dragLevel === 1 && targetLevel === 0 && dropPosition === 0) {
      return of(true);
    }
    if (dragLevel === 0 && targetLevel >= 1) {
      return of(false);
    }
    return of(false);
  }

  delete(data: Route): void {
    this.global.deleteConfirm(`路由【${data.name}】`, () => {
      this.routes
        .delete([data.id])
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`删除成功`);
          this.getData();
        });
    });
  }
}
