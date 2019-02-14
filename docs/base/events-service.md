#### publish(topic: string, args?: any)

- `topic` 主题名称
- `args` 发送参数

发布一个组件通讯事件

``` typescript
this.events.publish('any', {
    name: 'kain'
});
```

#### on(topic: string): Observable< any >

- `topic` 主题名称

订阅一个组件通讯事件

```typescript
this.events.on('any').subscribe(args => {
    console.log(args);
});
```

#### off(topic: string)

- `topic` 主题名称

在每次组件OnDestory时，都需要将自定义通讯取消订阅

```typescript
this.events.off('any');
```

#### events: locale

- 语言包切换事件

监听切换

```typescript
this.events.on('locale').subscribe(args => {
    console.log(args);
});
```
