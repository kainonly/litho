# 组件通讯服务 - EventsService

##### `publish(topic: string, args?: any)`

- `topic` 主题名称
- `args` 发送参数

发布一个组件通讯事件

``` typescript
this.events.publish('any', {
    name: 'kain'
});
```

##### `on(topic: string): Observable<any>`

- `topic` 主题名称

订阅一个组件通讯事件

```typescript
this.events.on('any').subscribe(args => {
    console.log(args);
});
```

##### `off(topic: string)`

- `topic` 主题名称

取消已订阅的组件通讯事件

```typescript
this.events.off('any');
```