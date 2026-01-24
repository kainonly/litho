import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-layout',
  styleUrl: `./layout.less`,
  templateUrl: './layout.html'
})
export class Layout implements OnInit {
  global = inject(Global);

  private destroyRef = inject(DestroyRef);
  private modal = inject(NzModalService);

  ngOnInit(): void { }
}
