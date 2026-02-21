import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { Global, SharedModule } from '@shared';
import { ResourcesApi } from '@shared/apis/resources-api';
import { Resource } from '@shared/models';

@Component({
  imports: [SharedModule],
  selector: 'app-system-access-resources-actions',
  templateUrl: './actions.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Actions implements OnInit {
  global = inject(Global);
  resources = inject(ResourcesApi);

  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  resourceId!: string;
  resourceData = signal<Resource | undefined>(undefined);

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ id }) => {
      this.resourceId = id;
      this.resources
        .findById(this.resourceId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(data => {
          this.resourceData.set(data);
        });
    });
  }
}
