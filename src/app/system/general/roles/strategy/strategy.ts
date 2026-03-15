import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { FlagSet, Global, Item, SharedModule } from '@shared';
import { CapsApi } from '@shared/apis/caps-api';
import { RolesApi } from '@shared/apis/roles-api';
import { RoutesApi } from '@shared/apis/routes-api';
import { Role } from '@shared/models';

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
  caps = inject(CapsApi);

  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  roleId = '';
  roleData = signal<Role | undefined>(undefined);

  display = new FlagSet();
  navNodes = signal<Record<string, NzTreeNodeOptions[]>>({});

  capItem = new Item(this.caps);

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
      });
  }

  getCaps(): void {
    const params = new HttpParams();
    this.capItem.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  watchDisplay(key: string, v: boolean) {
    if (v) {
      this.display.add(key);
    } else {
      this.display.delete(key);
    }
  }

  removeCap(v: string): void {
    const role = this.roleData()!;
    this.roleData.set({
      ...role,
      strategy: {
        ...role.strategy,
        caps: role.strategy.caps.filter(c => c !== v)
      }
    });
  }

  setStrategy(): void {
    console.log(this.roleData()!.strategy);
  }
}
