import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NzTreeNodeKey } from 'ng-zorro-antd/core/tree';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { FlagSet, Global, Item, SharedModule } from '@shared';
import { CapsApi } from '@shared/apis/caps-api';
import { RolesApi } from '@shared/apis/roles-api';
import { RoutesApi } from '@shared/apis/routes-api';
import { Role } from '@shared/models';

import { SetCaps, SetCapsInput } from './set-caps/set-caps';

@Component({
  imports: [SharedModule, NzTreeModule],
  selector: 'app-system-roles-strategy',
  templateUrl: './strategy.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Strategy implements OnInit {
  global = inject(Global);
  roles = inject(RolesApi);
  routes = inject(RoutesApi);
  capsApi = inject(CapsApi);

  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);

  roleId = '';
  roleData = signal<Role | undefined>(undefined);

  strategyNavs = new FlagSet();
  strategyRoutes = signal<string[]>([]);
  strategyCaps = signal<string[]>([]);
  navNodes = signal<Record<string, NzTreeNodeOptions[]>>({});

  capItem = new Item(this.capsApi);

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ id }) => {
      this.roleId = id;
      this.getRole();
      this.getRoutes();
      this.getCaps();
    });
  }

  getRole(): void {
    this.roles
      .findById(this.roleId, new HttpParams().set(`full`, `1`))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.roleData.set(data);
        this.strategyNavs.reset(data.strategy.navs);
        this.strategyRoutes.set(data.strategy.routes);
        this.strategyCaps.set(data.strategy.caps);
      });
  }

  getRoutes(): void {
    const params = new HttpParams();
    this.routes
      .find(params, { page: 1, pagesize: 1000 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ data }) => {
        const nodeMap = new Map<string, NzTreeNodeOptions>();
        const grouped: Record<string, NzTreeNodeOptions[]> = {};

        for (const item of data) {
          nodeMap.set(item.id, {
            title: item.name,
            key: item.id,
            icon: item.icon || undefined,
            isLeaf: item.type !== 1,
            expanded: true,
            selectable: false,
            children: []
          });
        }

        for (const item of data) {
          const node = nodeMap.get(item.id)!;
          if (item.pid && item.pid !== '0') {
            const parent = nodeMap.get(item.pid);
            if (parent) {
              parent.children!.push(node);
              continue;
            }
          }
          grouped[item.nav] ??= [];
          grouped[item.nav].push(node);
        }

        this.navNodes.set(grouped);
        // nzData 更新后重新扩散 nzCheckedKeys，确保 tree 正确渲染已勾选项
        this.strategyRoutes.update(v => [...v]);
      });
  }

  getCaps(): void {
    const params = new HttpParams();
    this.capItem.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  watchNav(key: string, v: boolean): void {
    if (v) {
      this.strategyNavs.add(key);
    } else {
      this.strategyNavs.delete(key);
    }
  }

  watchRoute(navKey: string, checked: NzTreeNodeKey[]): void {
    const allInNav = this.getAllNodeKeys(this.navNodes()[navKey]);
    this.strategyRoutes.update(routes => [...routes.filter(r => !allInNav.includes(r)), ...(checked as string[])]);
  }

  private getAllNodeKeys(nodes: NzTreeNodeOptions[]): string[] {
    const keys: string[] = [];
    const collect = (items: NzTreeNodeOptions[]) => {
      for (const item of items) {
        keys.push(item.key as string);
        if (item.children?.length) {
          collect(item.children);
        }
      }
    };
    collect(nodes ?? []);
    return keys;
  }

  openCapModal(): void {
    this.modal.create<SetCaps, SetCapsInput>({
      nzTitle: '设置能力',
      nzContent: SetCaps,
      nzWidth: 640,
      nzData: {
        caps: this.capItem.data(),
        selected: this.strategyCaps()
      },
      nzOnOk: (ref) => {
        this.strategyCaps.set([...ref.selection.keys()]);
      }
    });
  }

  removeCap(v: string): void {
    this.strategyCaps.update(c => c.filter((x: string) => x !== v));
  }

  setStrategy(): void {
    const strategy = {
      navs: [...this.strategyNavs.keys()],
      routes: this.strategyRoutes(),
      caps: this.strategyCaps()
    };
    this.roles
      .setStrategy(this.roleId, strategy)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.message.success(`授权更新成功`);
      });
  }
}
