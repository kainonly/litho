## HttpService 请求处理

#### req(url: string, body: any = {}, method = 'post'): Observable< any >

创建请求对象

- **url** `string` 请求路由
- **body** `any` 发送数据
- **method** `string` 请求类型, 默认为 `post` 请求
- **Return**  `Observable< any >`

!> 在之前需要定义配置 `origin` `namespace`

例如：请求导航接口

```typescript
this.http.req('main/nav').subscribe(res => {
    console.log(res);
});
```


##### 如何跨域携带 Cookie

在 `environment` 中启用

```typescript
export const environment = {
  bit: {
    withCredentials: true
  }
};
```

#### get(model: string, condition: number | string | SearchOptions[], origin = false): Observable< any >

创建一个获取单条数据的处理

- **model** `string` 模块名称
- **condition** `number | string | SearchOptions[]` 条件
- **special** `boolean` 是否返回源数据

```typescript
get(id: number) {
  return this.http.get(this.model, {id});
}
```

#### lists(model: string, condition: SearchOptions[] = [], refresh = false, origin = false): Observable< any >

创建一个分页列表数据的处理

- **model** `string` 模块名称
- **condition** `SearchOptions[]` 条件数组
- **refresh** `boolean` 强制刷新，即重置分页相关的字段
- **special** `boolean` 是否返回源数据

```typescript
lists(search: any, app: number, refresh: boolean): Observable<any> {
  return this.http.lists(this.model, search, refresh);
}
```

#### originLists(model: string, condition: SearchOptions[] = [], special = false): Observable< any >

创建一个列表数据的处理

- **model** `string` 模块名称
- **condition** `SearchOptions` 条件数组
- **special** `boolean` 是否返回源数据

```typescript
originLists(): Observable<any> {
  return this.http.originLists(this.model);
}
```

#### add(model: string, data: any): Observable< any >

创建一个新增的处理

- **model** `string` 模块名称
- **data** `any` 新增数据

```typescript
add(data: any) {
  return this.http.add(this.model, data);
}
```

#### edit(model: string, data: any, condition?: SearchOptions[]): Observable< any >

创建一个编辑的处理

- **model** `string` 模块名称
- **data** `any` 编辑数据
- **condition** `SearchOptions` 条件数组

```typescript
edit(data: any): Observable<any> {
  return this.http.edit(this.model, data);
}
```

##### status(model: string, data: any, field = 'status', extra?: any): Observable< any >

创建一个状态切换的处理

- **model** `string` 模块名称
- **data** `any` 切换数据
- **field** `string` 状态字段，默认 `status`
- **extra** `any` 扩展字段

```typescript
status(data: any, app: number): Observable<any> {
  return this.http.status(this.model, data, undefined, {app});
}
```

#### delete(model: string, condition: any | number | number[] | string | string[] | SearchOptions[]): Observable< any >

创建一个删除的处理

- **model** `string` 模块名称
- **condition** `any | number | number[] | string | string[] | SearchOptions[]` 条件数组

```typescript
delete(id: any, app: number): Observable<any> {
  return this.http.delete(this.model, id);
}
```