import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { AppService } from '@app';
import { WpxStoreService } from '@weplanx/ng/store';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  constructor(public app: AppService) {}
}
