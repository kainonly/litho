## HttpService - HTTP

#### req(url: string, body: any = {}, method = 'post'): Observable< any >

Create request object

- **url** `string` Request url
- **body** `any` Send data
- **method** `string` Request Method, default `post`
- **Return**  `Observable< any >`

!> Before you need to define the configuration `origin` `namespace`

For example: request navigation interface

```typescript
this.http.req('main/nav').subscribe(res => {
    console.log(res);
});
```


> How to carry cookies across domains

Enabled in `environment`

```typescript
export const environment = {
  bit: {
    withCredentials: true
  }
};
```

#### get(model: string, condition: number | string | SearchOptions[], origin = false): Observable< any >

Create a process to get a single piece of data

- **model** `string` Model name
- **condition** `number | string | SearchOptions[]` Condition
- **special** `boolean` Whether to return source data

```typescript
get(id: number) {
  return this.http.get(this.model, {id});
}
```

#### lists(model: string, condition: SearchOptions[] = [], refresh = false, origin = false): Observable< any >

Create a page list data processing

- **model** `string` Model name
- **condition** `SearchOptions[]` Condition
- **refresh** `boolean` Forced refresh, that is, reset paging related fields
- **special** `boolean` Whether to return source data

```typescript
lists(search: any, app: number, refresh: boolean): Observable<any> {
  return this.http.lists(this.model, search, refresh);
}
```

#### originLists(model: string, condition: SearchOptions[] = [], special = false): Observable< any >

Create a list data processing

- **model** `string` Model name
- **condition** `SearchOptions` Condition
- **special** `boolean` Whether to return source data

```typescript
originLists(): Observable<any> {
  return this.http.originLists(this.model);
}
```

#### add(model: string, data: any): Observable< any >

Create a new process

- **model** `string` Model name
- **data** `any` Add data

```typescript
add(data: any) {
  return this.http.add(this.model, data);
}
```

#### edit(model: string, data: any, condition?: SearchOptions[]): Observable< any >

Create an edited process

- **model** `string` Model name
- **data** `any` Edit data
- **condition** `SearchOptions` Condition

```typescript
edit(data: any): Observable<any> {
  return this.http.edit(this.model, data);
}
```

#### status(model: string, data: any, field = 'status', extra?: any): Observable< any >

Create a state switch processing

- **model** `string` Model name
- **data** `any` Switch data
- **field** `string` Status field, default `status`
- **extra** `any` Extra field

```typescript
status(data: any, app: number): Observable<any> {
  return this.http.status(this.model, data, undefined, {app});
}
```

#### delete(model: string, condition: any | number | number[] | string | string[] | SearchOptions[]): Observable< any >

Create a delete process

- **model** `string` Model name
- **condition** `any | number | number[] | string | string[] | SearchOptions[]` Condition

```typescript
delete(id: any, app: number): Observable<any> {
  return this.http.delete(this.model, id);
}
```