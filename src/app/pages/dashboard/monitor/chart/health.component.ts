import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';

import { Area } from '@antv/g2plot';

@Component({
  selector: 'app-monitor-health',
  template: `<div style="height: 300px" #ref></div>`
})
export class HealthComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Area;
  private timer!: Subscription;

  async ngAfterViewInit(): Promise<void> {
    const res = await fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json');
    const originalData = await res.json();
    let cnt = 2;
    this.chart = new Area(this.ref.nativeElement, {
      data: originalData.slice(0, cnt),
      xField: 'timePeriod',
      yField: 'value',
      xAxis: {
        range: [0, 1]
      }
    });
    this.chart.render();
    this.timer = timer(0, 400).subscribe(() => {
      if (cnt === originalData.length) {
        this.timer.unsubscribe();
      } else {
        cnt += 1;
        this.chart.changeData(originalData.slice(0, cnt));
      }
    });
  }

  ngOnDestroy(): void {
    this.timer.unsubscribe();
    this.chart.destroy();
  }
}
