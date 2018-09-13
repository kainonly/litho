import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class EventsService {
  private events: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  /**
   * TODO:发布组件通讯
   */
  publish(topic: string, args?: any) {
    const topics = this.events.get(topic);
    if (topics) {
      topics.next((args !== undefined) ? args : null);
    } else {
      this.events.set(topic, new Subject()).get(topic).next(args);
    }
  }

  /**
   * TODO:组件通讯监听
   */
  on(topic: string): Observable<any> {
    const topics = this.events.get(topic);
    if (topics) {
      return topics;
    } else {
      return this.events.set(topic, new Subject()).get(topic);
    }
  }

  /**
   * TODO:组件通讯取消监听
   */
  off(topic: string) {
    const topics = this.events.get(topic);
    if (topics) {
      topics.unsubscribe();
      this.events.delete(topic);
    }
  }
}
