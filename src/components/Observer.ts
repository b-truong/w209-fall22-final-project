/**
 * Generic observer class
 */
export default class Observer<T> {
  events: T[] = [];
  subscribers: ((event: T) => void)[] = [];

  /** Publish event. */
  publish = (event: T) => {
    this.events.push(event);
    this.subscribers.forEach((subscriber) => subscriber(event));
  };

  /** Subscribe to events. Immediately get all previously published events */
  subscribe = (callback: (event: T) => void) => {
    this.subscribers.push(callback);
    this.events.forEach((event) => callback(event));
  };
}
