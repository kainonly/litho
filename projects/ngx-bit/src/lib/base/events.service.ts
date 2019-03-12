import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class EventsService {
  private events: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  /**
   * Publish a component event
   */
  publish(topic: string, args?: any) {
    if (this.events.has(topic)) {
      const topics = this.events.get(topic);
      topics.next(args !== undefined ? args : null);
    } else {
      this.events.set(topic, new Subject()).get(topic).next(args);
    }
  }

  /**
   * Subscribe to component event
   */
  on(topic: string): Observable<any> {
    return this.events.has(topic) ? this.events.get(topic) :
      this.events.set(topic, new Subject()).get(topic);
  }

  /**
   * Unsubscribe component event
   */
  off(topic: string) {
    if (this.events.has(topic)) {
      const topics = this.events.get(topic);
      topics.unsubscribe();
      this.events.delete(topic);
    }
  }
}
