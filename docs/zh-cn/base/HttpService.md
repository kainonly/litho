# 请求服务 - HttpService

> `HttpService` 是对配置组合的请求封装服务。

##### `req(url: string, body: any = {}): Observable<any>`

- 请求对象合成，默认为 `post` 请求
- `url` RESTful请求路由地址
- `body` 发送数据


生成验证jwt的请求对象

```typescript
this.http.req('main/nav').subscribe(res => {
    console.log(res);
});
```
