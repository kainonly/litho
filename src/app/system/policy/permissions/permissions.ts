import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Global, SharedModule } from '@shared';
import { PermissionsApi } from '@shared/apis/permissions-api';

@Component({
  imports: [SharedModule],
  selector: 'app-system-permissions',
  templateUrl: './permissions.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Permissions implements OnInit {
  global = inject(Global);
  permissions = inject(PermissionsApi);

  private destroyRef = inject(DestroyRef);

  m = this.global.setModel(`permissions`, this.permissions, {
    q: ''
  });

  ngOnInit(): void {
    this.m
      .ready()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.getData();
      });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.m.page.set(1);
    }
    let params = new HttpParams();
    const { q } = this.m.search;
    if (q) {
      params = params.set('q', q);
    }
    this.m.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
