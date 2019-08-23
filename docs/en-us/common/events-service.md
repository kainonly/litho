## EventsService - Events

#### publish(topic: string, args?: any)

Publish Event

- **topic** `string` Topic Name
- **args** `args` Args

``` typescript
this.events.publish('any', {
    name: 'kain'
});
```

#### on(topic: string): Observable< any >

Subscribe Event

- **topic** `string` Topic Name
- **Return** `Observable< any >`

```typescript
this.events.on('any').subscribe(args => {
    console.log(args);
});
```

#### off(topic: string)

Unsubscribe Event

!> Unsubscribe custom events each time the component `OnDestory` is routed

- **topic** `string` Topic Name

```typescript
this.events.off('any');
```

> Locale Event

```typescript
this.events.on('locale').subscribe(args => {
    console.log(args);
    // zh_cn or en_us
});
```