import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class EventsService {
  private events: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  publish(topic: string, args?: any) {
    const topics = this.events.get(topic);
    if (topics) {
      topics.next((args !== undefined) ? args : null);
    } else {
      this.events.set(topic, new Subject()).get(topic).next(args);
    }
  }

  on(topic: string): Observable<any> {
    const topics = this.events.get(topic);
    if (topics) {
      return topics;
    } else {
      return this.events.set(topic, new Subject()).get(topic);
    }
  }

  off(topic: string) {
    const topics = this.events.get(topic);
    if (topics) {
      topics.unsubscribe();
      this.events.delete(topic);
    }
  }
}
