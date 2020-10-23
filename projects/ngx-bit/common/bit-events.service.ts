import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class BitEventsService {
  private events: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  /**
   * Whether the event exists
   */
  exists(topic: string): boolean {
    return this.events.has(topic);
  }

  /**
   * Publish a component event
   */
  publish(topic: string, args?: any): void {
    if (this.exists(topic)) {
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
    if (this.exists(topic)) {
      return this.events.get(topic);
    } else {
      return this.events.set(topic, new Subject()).get(topic);
    }
  }

  /**
   * Unsubscribe component event
   */
  off(topic: string): void {
    if (this.exists(topic)) {
      const topics = this.events.get(topic);
      topics.unsubscribe();
      this.events.delete(topic);
    }
  }
}
