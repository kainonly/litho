## CURD HTTP (HttpService)

##### req(url: string, body: any = {}, , method = 'post'): Observable< any >

Create request object

- **url** Request Url
- **body** Request Body
- **method** Request Method, default `post`
- **Return**  `Observable< any >`

!> Before you need to define the configuration `origin` `namespace`

For example: request navigation

```typescript
this.http.req('main/nav').subscribe(res => {
    console.log(res);
});
```


##### How to with cookies across domains

Enabled in `environment`

```typescript
export const environment = {
  bit: {
    withCredentials: true
  }
};
```

##### get(model: string, condition: any, special = false): Observable< any >

Create a process to get a single piece of data

- **model** Model Name
- **condition** Condition Array
- **special** Enable Data Source

```typescript
get(id: number) {
  return this.http.get(this.model, {id});
}
```

##### lists(model: string, condition: any[] = [], refresh = false, special = false): Observable< any >

Create a page list data processing

- **model** Model Name
- **condition** Condition Array
- **refresh** Forced refresh, that is, reset paging related fields
- **special** Enable Data Source

```typescript
lists(search: any, app: number, refresh: boolean): Observable<any> {
  return this.http.lists(this.model, search, refresh);
}
```

##### originLists(model: string, condition: any[] = [], special = false): Observable< any >

Create a list data processing

- **model** Model Name
- **condition** Condition Array
- **special** Enable Data Source

```typescript
originLists(): Observable<any> {
  return this.http.originLists(this.model);
}
```

##### add(model: string, data: any): Observable< any >

Create a new process

- **model** Model Name
- **data** Data

```typescript
add(data: any) {
  return this.http.add(this.model, data);
}
```

##### edit(model: string, data: any, condition: any = []): Observable< any >

Create an edited process

- **model** Model Name
- **data** Data
- **condition** Condition Array

```typescript
edit(data: any): Observable<any> {
  return this.http.edit(this.model, data);
}
```

##### status(model: string, data: any, field = 'status', extra?: any): Observable< any >

Create a state switch processing

- **model** Model Name
- **data** Data
- **field** Status Field, default `status`
- **extra** Extra Field

```typescript
status(data: any, app: number): Observable<any> {
  return this.http.status(this.model, data, undefined, {app});
}
```

##### delete(model: string, condition: any): Observable< any >

Create a delete process

- **model** Model Name
- **condition** Condition Array

```typescript
delete(id: any, app: number): Observable<any> {
  return this.http.delete(this.model, {id, app});
}
```