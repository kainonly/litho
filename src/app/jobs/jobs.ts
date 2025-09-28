import { HttpParams } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { JobsApi } from '@shared/apis/jobs-api';

import { Layout } from '../__layout/layout';

@Component({
  standalone: true,
  imports: [SharedModule, Layout],
  selector: 'app-jobs',
  templateUrl: './jobs.html'
})
export class Jobs implements OnInit {
  global = inject(Global);
  jobs = inject(JobsApi);

  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  m = this.global.setModel('jobs', this.jobs, {
    q: ''
  });

  ngOnInit(): void {
    this.m
      .ready()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.getData();
      });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.m.page = 1;
    }
    let params = new HttpParams();
    const { q } = this.m.search;
    if (q) {
      params = params.set('q', q);
    }
    this.m.fetch(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  open(): void {}

  bulkDelete(): void {}
}
