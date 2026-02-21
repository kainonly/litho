import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { SharedModule } from '@shared';
import { RolesApi } from '@shared/apis/roles-api';
import { Role } from '@shared/models';

@Component({
  imports: [SharedModule],
  selector: 'app-system-roles-views',
  templateUrl: './views.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Views implements OnInit {
  roles = inject(RolesApi);

  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  roleId = '';
  roleData = signal<Role | null>(null);

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
}
