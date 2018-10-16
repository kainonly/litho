# 请求服务 - HttpService

> `HttpService` 是对 `Angular HttpClient` 的增强封装，在调用 `req` 函数时不仅是对配置信息组合，在请求的过程中还做了登录校验、令牌校验以及自动刷新令牌等。

##### `req(url: string, body: any = {}, jwt = true): Observable<any>`

- 请求对象合成，默认为 `post` 请求
- `url` RESTful请求路由地址
- `body` 发送数据
- `jwt` 是否需要jwt验证

例子1：生成不验证jwt的请求对象

```typescript
this.http.req('main/login', {
    username: 'nobody',
    password: '123'
}, false).subscribe(res => {
    console.log(res);
});
```

例子2：生成验证jwt的请求对象

```typescript
this.http.req('main/nav').subscribe(res => {
    console.log(res);
});
```