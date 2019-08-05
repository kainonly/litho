## Events (EventsService)

##### publish(topic: string, args?: any)

Publish component communication events

- **topic** Topic Name
- **args** Args

``` typescript
this.events.publish('any', {
    name: 'kain'
});
```

##### on(topic: string): Observable< any >

Subscribe to component newsletter events

- **topic** Topic Name
- **Return** `Observable< any >`

```typescript
this.events.on('any').subscribe(args => {
    console.log(args);
});
```

##### off(topic: string)

Unsubscribed component communication event

!> Unsubscribe custom events each time the component `OnDestory` is routed

- **topic** Topic Name

```typescript
this.events.off('any');
```

##### Language packet switching event

```typescript
this.events.on('locale').subscribe(args => {
    console.log(args);
    // zh_cn or en_us
});
```
