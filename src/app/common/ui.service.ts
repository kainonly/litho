import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UiService {
  container = new BehaviorSubject([]);
}
