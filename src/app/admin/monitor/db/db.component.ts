import { Component, OnDestroy, OnInit } from '@angular/core';
import { pipe, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MonitorService } from '../monitor.service';

@Component({
  selector: 'app-admin-monitor-db',
  templateUrl: './db.component.html'
})
export class DbComponent implements OnInit, OnDestroy {
  uptime: number = 0;
  private subscription!: Subscription;

  constructor(private monitor: MonitorService) {}

  ngOnInit(): void {
    this.subscription = this.monitor.interval
      .pipe(
        switchMap(v => timer(0, v * 1000)),
        switchMap(() => this.monitor.getMongoUptime())
      )
      .subscribe(data => {
        this.uptime = data.value;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
