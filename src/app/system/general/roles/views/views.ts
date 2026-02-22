import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NzFloatButtonComponent } from 'ng-zorro-antd/float-button';
import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { FlagSet, Global, SharedModule } from '@shared';
import { RolesApi } from '@shared/apis/roles-api';
import { Role } from '@shared/models';

@Component({
  imports: [SharedModule, NzFloatButtonComponent, NzTreeModule],
  selector: 'app-system-roles-views',
  templateUrl: './views.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Views implements OnInit {
  global = inject(Global);
  roles = inject(RolesApi);

  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  roleId = '';
  roleData = signal<Role | undefined>(undefined);

  display = new FlagSet();
  nodes = signal<NzTreeNodeOptions[]>([]);

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ id }) => {
      this.roleId = id;
      this.getRole();
    });
  }

  getRole(): void {
    this.roles
      .findById(this.roleId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.roleData.set(data);
      });
  }

  watchDisplay(key: string, v: boolean) {
    if (v) {
      this.display.add(key);
    } else {
      this.display.delete(key);
    }
  }
}
