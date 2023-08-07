import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Any } from '@weplanx/ng';

import { ObservabilityService } from './observability.service';
import { ExporterName } from './types';

@Component({
  selector: 'app-observability-sum',
  template: `
    <nz-card nzType="inner">
      <ng-template #titleRef>
        <b style="color: rgba(0, 0, 0, 0.85)">{{ title }}</b>
      </ng-template>
      <nz-statistic [nzValue]="value()" [nzTitle]="titleRef"></nz-statistic>
    </nz-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SumComponent implements OnInit, OnDestroy {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) name!: ExporterName;
  @Input() fn?: (v: Any) => Any;

  loading = signal(true);
  value = signal<Any>(0);

  private subscription!: Subscription;

  constructor(private observability: ObservabilityService) {}

  ngOnInit(): void {
    this.subscription = this.observability.interval$
      .pipe(
        switchMap(v => timer(0, v * 1000)),
        switchMap(() => this.observability.exporter<Any>(this.name))
      )
      .subscribe(data => {
        if (!this.fn) {
          this.value.set(data);
        } else {
          this.value.set(this.fn(data));
        }
        setTimeout(() => {
          this.loading.set(false);
        }, 200);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
