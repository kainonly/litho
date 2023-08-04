import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Area } from '@antv/g2plot';

import { ObservabilityService } from '../observability.service';

@Component({
  selector: 'v-mongo-open-connections',
  template: `
    <ng-template #title><b i18n>打开连接</b></ng-template>
    <nz-card nzSize="small" [nzTitle]="title">
      <div #ref></div>
    </nz-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpenConnectionsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ref', { static: true }) ref!: ElementRef;

  private plot?: Area;
  private subscription!: Subscription;

  constructor(private observability: ObservabilityService) {}

  ngOnInit(): void {
    this.subscription = this.observability.interval
      .pipe(
        switchMap(v => timer(0, v * 1000)),
        switchMap(() => this.observability.getMongoOpenConnections())
      )
      .subscribe(data => {
        if (this.plot) {
          this.plot.changeData(data.map(v => ({ time: v[0], value: v[1] })));
        }
      });
  }

  ngAfterViewInit(): void {
    this.plot = new Area(this.ref.nativeElement, {
      data: [],
      height: 200,
      xField: 'time',
      yField: 'value',
      meta: {
        value: {
          alias: '数值',
          formatter: v => (v > 1000 ? `${v / 1000}k` : v)
        }
      }
    });
    this.plot.render();
  }

  ngOnDestroy(): void {
    this.plot?.destroy();
    this.subscription.unsubscribe();
  }
}
