import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  signal,
  ViewChild
} from '@angular/core';
import { empty, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Area, AreaOptions } from '@antv/g2plot';
import { Any } from '@weplanx/ng';

import { ObservabilityService } from './observability.service';
import { ExporterName } from './types';

@Component({
  selector: 'app-observability-area',
  template: `
    <ng-template #titleRef>
      <b>{{ title }}</b>
    </ng-template>
    <nz-card [nzBodyStyle]="{ 'min-height': height }" nzSize="small" [nzTitle]="titleRef" [nzLoading]="loading()">
      <div #ref></div>
    </nz-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaComponent implements AfterContentInit, OnDestroy {
  @ViewChild('ref', { static: true }) ref!: ElementRef;

  @Input({ required: true }) title!: string;
  @Input({ required: true }) name!: ExporterName;
  @Input() height = '200px';
  @Input() options?: Omit<AreaOptions, 'data'>;
  @Input() fn?: (plot: Area, data: Any[][]) => void;

  loading = signal(true);
  private plot!: Area;
  private subscription!: Subscription;

  constructor(private observability: ObservabilityService) {}

  ngAfterContentInit(): void {
    this.plot = new Area(this.ref.nativeElement, {
      data: [],
      height: 200,
      xField: 'time',
      yField: 'value',
      supportCSSTransform: true,
      ...this.options
    });
    this.plot.render();
    this.subscription = this.observability.interval$
      .pipe(
        switchMap(v => timer(0, v * 1000)),
        switchMap(() => this.observability.exporter<Any[][]>(this.name))
      )
      .subscribe(data => {
        if (!this.fn) {
          this.plot.changeData(data.map(v => ({ time: v[0], value: v[1] })));
        } else {
          this.fn(this.plot, data);
        }
        setTimeout(() => {
          this.loading.set(false);
        }, 200);
      });
  }

  ngOnDestroy(): void {
    this.plot.destroy();
    this.subscription.unsubscribe();
  }
}
