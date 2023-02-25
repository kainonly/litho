import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Area } from '@antv/g2plot';

import { MonitorService } from '../../monitor.service';

@Component({
  selector: 'app-admin-monitor-apm-cgo-calls',
  template: `
    <nz-card nzTitle="进程调用 CGO">
      <div #ref></div>
    </nz-card>
  `
})
export class CgoCallsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() interval = 5;

  @ViewChild('ref') ref!: ElementRef;
  private plot?: Area;
  private subscription!: Subscription;

  constructor(private monitor: MonitorService) {}

  ngOnInit(): void {
    this.subscription = timer(0, this.interval * 1000)
      .pipe(switchMap(() => this.monitor.getCgoCalls()))
      .subscribe(data => {
        if (this.plot) {
          this.plot.changeData(data.map(v => ({ time: v[0], value: v[1] })));
        }
      });
  }

  ngAfterViewInit(): void {
    this.plot = new Area(this.ref.nativeElement, {
      height: 140,
      data: [],
      xField: 'time',
      yField: 'value',
      xAxis: {
        range: [0, 1]
      }
    });
    this.plot.render();
  }

  ngOnDestroy(): void {
    this.plot?.destroy();
    this.subscription.unsubscribe();
  }
}
