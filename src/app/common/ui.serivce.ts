import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UiSerivce {
  container = new BehaviorSubject([]);
}
