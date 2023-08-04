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
  selector: 'v-mongo-commands-per-second',
  template: `
    <ng-template #titleTpl><b i18n>每秒命令</b></ng-template>
    <nz-card nzSize="small" [nzTitle]="titleTpl">
      <div #ref></div>
    </nz-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandPerSecondComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ref', { static: true }) ref!: ElementRef;

  private plot?: Area;
  private subscription!: Subscription;

  constructor(private observability: ObservabilityService) {}

  ngOnInit(): void {
    this.subscription = this.observability.interval
      .pipe(
        switchMap(v => timer(0, v * 1000)),
        switchMap(() => this.observability.getMongoCommandsPerSecond())
      )
      .subscribe(data => {
        if (this.plot) {
          this.plot.changeData(data.map(v => ({ time: v[0], value: v[1] })));
        }
      });
  }

  ngAfterViewInit(): void {
    this.plot = new Area(this.ref.nativeElement, {
      height: 200,
      data: [],
      xField: 'time',
      yField: 'value',
      meta: {
        value: {
          alias: '数值',
          formatter: value => `${value} ops`
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
