import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '@app';

@Component({
  selector: 'app-index',
  template: ` <router-outlet></router-outlet> `
})
export class IndexComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, public app: AppService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
