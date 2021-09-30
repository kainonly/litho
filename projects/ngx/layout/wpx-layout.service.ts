import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import { WpxLayout, WpxPageNode, WpxPageNodes } from './types';

@Injectable({
  providedIn: 'root'
})
export class WpxLayoutService {
  root?: Partial<WpxLayout>;
  readonly pages: BehaviorSubject<WpxPageNodes> = new BehaviorSubject<WpxPageNodes>(<WpxPageNodes>{});
  fragments!: string[];

  constructor(private router: Router) {}
}
