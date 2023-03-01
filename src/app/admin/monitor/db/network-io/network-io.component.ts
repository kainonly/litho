import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Area } from '@antv/g2plot';

import { MonitorService } from '../../monitor.service';

@Component({
  selector: 'app-admin-monitor-db-network-io',
  template: `
    <ng-template #titleTpl><b i18n>网络 IO</b></ng-template>
    <nz-card [nzTitle]="titleTpl">
      <div #ref></div>
    </nz-card>
  `
})
export class NetworkIoComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() interval = 5;

  @ViewChild('ref') ref!: ElementRef;
  private plot?: Area;
  private subscription!: Subscription;

  constructor(private monitor: MonitorService) {}

  ngOnInit(): void {
    this.subscription = this.monitor.interval
      .pipe(
        switchMap(v => timer(0, v * 1000)),
        switchMap(() => this.monitor.getMongoNetworkIO())
      )
      .subscribe(data => {
        if (this.plot) {
          this.plot.changeData(data.map(v => ({ time: v[0], value: v[1], type: this.getType(v[2] as number) })));
        }
      });
  }

  ngAfterViewInit(): void {
    this.plot = new Area(this.ref.nativeElement, {
      height: 200,
      data: [],
      xField: 'time',
      yField: 'value',
      seriesField: 'type',
      meta: {
        value: {
          formatter: value => `${value} bytes`
        }
      }
    });
    this.plot.render();
  }

  ngOnDestroy(): void {
    this.plot?.destroy();
    this.subscription.unsubscribe();
  }

  getType(v: number): string {
    switch (v) {
      case 1:
        return $localize`输出`;
      default:
        return $localize`输入`;
    }
  }
}
